module Api
  module V1
    module Enterprise
      class ApplicationsController < Api::V1::SecuredController
        before_action :authenticate_employer!
        before_action :set_application, only: [:show, :update, :download_cv]
        
        # GET /api/v1/enterprise/applications
        def index
          # Lấy các công việc của công ty hiện tại
          company_jobs = current_employer.company.jobs.pluck(:id)
          
          # Lấy các đơn ứng tuyển cho các công việc của công ty
          @applications = Application.joins(:job)
                                    .where(job_id: company_jobs)
                                    .includes(:user, :job, :user_cv)
          
          # Lọc theo job_id
          if params[:job_id].present?
            @applications = @applications.where(job_id: params[:job_id])
          end
          
          # Lọc theo status
          if params[:status].present?
            @applications = @applications.where(status: params[:status])
          end
          
          # Tìm kiếm
          if params[:search].present?
            search_term = "%#{params[:search]}%"
            @applications = @applications.where(
              "full_name LIKE ? OR email LIKE ? OR phone LIKE ?", 
              search_term, search_term, search_term
            )
          end
          
          # Sắp xếp
          sort_column = params[:sort] || 'created_at'
          sort_direction = params[:direction] || 'desc'
          @applications = @applications.order("#{sort_column} #{sort_direction}")
          
          # Phân trang
          if params[:page].present? && params[:per_page].present?
            @pagy, @applications = pagy(@applications, items: params[:per_page].to_i)
            
            metadata = {
              current_page: @pagy.page,
              per_page: @pagy.items,
              total_pages: @pagy.pages,
              count: @pagy.count
            }
            
            render json: {
              applications: ActiveModel::Serializer::CollectionSerializer.new(
                @applications.includes(:job, :user, :user_cv), 
                serializer: ApplicationSerializer
              ),
              metadata: metadata
            }
          else
            render json: @applications.includes(:job, :user, :user_cv), each_serializer: ApplicationSerializer
          end
        end
        
        # GET /api/v1/enterprise/applications/:id
        def show
          render json: @application, serializer: ApplicationSerializer
        end
        
        # PATCH/PUT /api/v1/enterprise/applications/:id
        def update
          old_status = @application.status
          
          if @application.update(application_params)
            # Kiểm tra nếu trạng thái thay đổi thì gửi email thông báo cho ứng viên
            if old_status != @application.status
              ApplicationNotificationMailer.application_status_updated(@application.id).deliver_later
            end
            
            render json: @application, serializer: ApplicationSerializer
          else
            render json: { errors: @application.errors.full_messages }, status: :unprocessable_entity
          end
        end
        
        # GET /api/v1/enterprise/applications/:id/download_cv
        def download_cv
          if @application.user_cv&.file&.attached?
            redirect_to rails_blob_path(@application.user_cv.file, disposition: "attachment")
          elsif @application.cv.attached?
            redirect_to rails_blob_path(@application.cv, disposition: "attachment")
          else
            render json: { error: 'CV not found' }, status: :not_found
          end
        end
        
        private
        
        def authenticate_employer!
          # TODO: Implement proper employer authentication
          # For now, we'll just check if the current user has an employer record
          unless current_account.employer.present?
            render json: { error: 'Unauthorized. Employer account required.' }, status: :unauthorized
          end
        end
        
        def current_employer
          current_account.employer
        end
        
        def set_application
          # Chỉ cho phép xem các đơn ứng tuyển vào công việc của công ty hiện tại
          company_jobs = current_employer.company.jobs.pluck(:id)
          @application = Application.joins(:job)
                                   .where(job_id: company_jobs)
                                   .find(params[:id])
        rescue ActiveRecord::RecordNotFound
          render json: { error: 'Đơn ứng tuyển không tồn tại hoặc không thuộc quyền quản lý của bạn' }, 
                 status: :not_found
        end
        
        def application_params
          params.require(:application).permit(:status)
        end
      end
    end
  end
end 
