class Api::V1::Admin::JobsController < Api::V1::SecuredController
  before_action :authenticate_admin!
  before_action :set_job, only: [:show, :update, :destroy]

  # GET /api/v1/admin/jobs
  def index
    @q = Job.includes(:company, :skills).ransack(params[:q])
    @q.sorts = 'created_at desc' if @q.sorts.empty?
    
    @pagy, @jobs = pagy(@q.result(distinct: true), limit: params[:per_page] || 12)
    
    metadata = {
      current_page: @pagy.page,
      per_page: @pagy.limit,
      total_pages: @pagy.pages,
      count: @pagy.count
    }

    render json: {
      jobs: ActiveModelSerializers::SerializableResource.new(@jobs),
      metadata: metadata
    }
  end

  # GET /api/v1/admin/jobs/:id
  def show
    render json: @job, serializer: JobSerializer, include: ['company', 'skills']
  end

  # POST /api/v1/admin/jobs
  def create
    params[:job][:job_type] = params[:job][:job_type].to_i
    params[:job][:contract_type] = params[:job][:contract_type].to_i
    params[:job][:experience] = params[:job][:experience].to_i
    params[:job][:status] = params[:job][:status].to_i
    params[:job][:salary_period] = params[:job][:salary_period].to_i if params[:job][:salary_period].present?
    
    @job = Job.new(job_params)

    if @job.save
      render json: @job, status: :created
    else
      render json: { errors: @job.errors.full_messages }, status: :unprocessable_entity
    end
  end

  # PATCH/PUT /api/v1/admin/jobs/:id
  def update
    params[:job][:job_type] = params[:job][:job_type].to_i if params[:job][:job_type].present?
    params[:job][:contract_type] = params[:job][:contract_type].to_i if params[:job][:contract_type].present?
    params[:job][:experience] = params[:job][:experience].to_i if params[:job][:experience].present?
    params[:job][:status] = params[:job][:status].to_i if params[:job][:status].present?
    params[:job][:salary_period] = params[:job][:salary_period].to_i if params[:job][:salary_period].present?

    if @job.update(job_params)
      render json: @job
    else
      render json: { errors: @job.errors.full_messages }, status: :unprocessable_entity
    end
  end

  # DELETE /api/v1/admin/jobs/:id
  def destroy
    @job.destroy
    head :no_content
  end

  private

  def authenticate_admin!
    unless current_admin
      render json: { error: 'Không có quyền truy cập. Yêu cầu quyền quản trị.' }, status: :unauthorized
    end
  end

  def set_job
    @job = Job.includes(:company, :company_address, :skills).find(params[:id])
  rescue ActiveRecord::RecordNotFound
    render json: { error: 'Không tìm thấy việc làm' }, status: :not_found
  end

  def job_params
    params.require(:job).permit(
      :title, :description, :requirements, :benefit, 
      :job_type, :contract_type, :min_salary, :max_salary, 
      :experience, :expired_at, :company_id, :company_address_id, :status,
      :currency, :salary_period, :display_salary,
      skill_ids: []
    )
  end
end 
