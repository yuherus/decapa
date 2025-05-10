class Api::V1::ApplicationsController < Api::V1::SecuredController
  before_action :set_application, only: [:show, :update, :destroy]
  
  # GET /api/v1/applications
  def index
    @applications = current_user.applications.includes(:job => :company)
    
    # Lọc theo status nếu có
    if params[:status].present?
      @applications = @applications.where(status: params[:status])
    end
    
    # Sắp xếp theo ngày tạo mới nhất
    @applications = @applications.order(created_at: :desc)
    
    # Phân trang nếu cần
    if params[:page].present? && params[:per_page].present?
      @pagy, @applications = pagy(@applications, items: params[:per_page])
      
      metadata = {
        current_page: @pagy.page,
        per_page: @pagy.limit,
        total_pages: @pagy.pages,
        count: @pagy.count
      }
      
      render json: {
        applications: ActiveModelSerializers::SerializableResource.new(
          @applications, 
          each_serializer: ApplicationSerializer,
          include: ['job.company', 'user', 'user_cv']  # Chỉ định rõ các mối quan hệ cần include
        ),
        metadata: metadata
      }
    else
      render json: @applications, 
        each_serializer: ApplicationSerializer,
        include: ['job.company', 'user', 'user_cv']
    end
  end
  
  # GET /api/v1/applications/:id
  def show
    render json: @application, serializer: ApplicationSerializer
  end
  
  # POST /api/v1/applications
  def create
    @application = current_user.applications.new(application_params)
    
    # Xử lý CV: Nếu có user_cv_id thì sử dụng CV có sẵn
    # Nếu không và có file CV mới thì đính kèm file
    if application_params[:user_cv_id].present?
      user_cv = current_user.user_cvs.find_by(id: application_params[:user_cv_id])
      if !user_cv
        return render json: { error: 'CV không tìm thấy' }, status: :not_found
      end
      @application.user_cv = user_cv
    elsif params[:application][:cv].present?
      @application.cv.attach(params[:application][:cv])
      
      # Lưu CV vào hệ thống nếu được yêu cầu
      if params[:application][:save_cv] == 'true' && params[:application][:cv_name].present?
        new_cv = current_user.user_cvs.new(
          name: params[:application][:cv_name], 
          is_default: current_user.user_cvs.count == 0
        )
        new_cv.file.attach(params[:application][:cv])
        new_cv.save
        @application.user_cv = new_cv
      end
    end
    
    if @application.save
      # Gửi email thông báo đơn ứng tuyển đã được gửi thành công
      ApplicationNotificationMailer.application_submitted(@application.id).deliver_later
      
      render json: @application, serializer: ApplicationSerializer, status: :created
    else
      render json: { errors: @application.errors.full_messages }, status: :unprocessable_entity
    end
  end
  
  # PATCH/PUT /api/v1/applications/:id
  def update
    old_status = @application.status
    
    if @application.update(application_update_params)
      # Kiểm tra nếu trạng thái thay đổi thì gửi email thông báo
      if old_status != @application.status
        ApplicationNotificationMailer.application_status_updated(@application.id).deliver_later
      end
      
      render json: @application, serializer: ApplicationSerializer
    else
      render json: { errors: @application.errors.full_messages }, status: :unprocessable_entity
    end
  end
  
  # DELETE /api/v1/applications/:id
  def destroy
    @application.destroy
    head :no_content
  end
  
  private
  
  def set_application
    @application = current_user.applications.find(params[:id])
  rescue ActiveRecord::RecordNotFound
    render json: { error: 'Đơn ứng tuyển không tìm thấy' }, status: :not_found
  end
  
  def application_params
    params.require(:application).permit(
      :job_id, :full_name, :email, :phone, 
      :cover_letter, :user_cv_id
    )
  end
  
  def application_update_params
    params.require(:application).permit(:full_name, :email, :phone, :cover_letter)
  end
end 
