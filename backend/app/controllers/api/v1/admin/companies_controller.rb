class Api::V1::Admin::CompaniesController < Api::V1::SecuredController
  before_action :authenticate_admin!
  before_action :set_company, only: [:show, :update, :destroy]

  # GET /api/v1/admin/companies
  def index
    @q = Company.includes(:country, :company_addresses, :company_social_links).ransack(params[:q])
    @q.sorts = 'created_at desc' if @q.sorts.empty?
    
    @pagy, @companies = pagy(@q.result(distinct: true), limit: params[:per_page] || 12)
    
    metadata = {
      current_page: @pagy.page,
      per_page: @pagy.limit,
      total_pages: @pagy.pages,
      count: @pagy.count
    }

    render json: {
      companies: ActiveModelSerializers::SerializableResource.new(@companies),
      metadata: metadata
    }
  end

  # GET /api/v1/admin/companies/:id
  def show
    render json: @company, include: ['country', 'company_addresses', 'company_social_links', 'company_key_skills']
  end

  # POST /api/v1/admin/companies
  def create
    params[:company][:company_size] = params[:company][:company_size].to_i
    params[:company][:industry] = params[:company][:industry].to_i
    params[:company][:company_type] = params[:company][:company_type].to_i
    params[:company][:status] = params[:company][:status].to_i
    
    @company = Company.new(company_params)

    if @company.save
      render json: @company, status: :created
    else
      render json: { errors: @company.errors.full_messages }, status: :unprocessable_entity
    end
  end

  # PATCH/PUT /api/v1/admin/companies/:id
  def update
    params[:company][:company_size] = params[:company][:company_size].to_i
    params[:company][:industry] = params[:company][:industry].to_i
    params[:company][:company_type] = params[:company][:company_type].to_i
    params[:company][:status] = params[:company][:status].to_i

    if @company.update(company_params)
      render json: @company
    else
      render json: { errors: @company.errors.full_messages }, status: :unprocessable_entity
    end
  end

  # DELETE /api/v1/admin/companies/:id
  def destroy
    @company.destroy
    head :no_content
  end

  private

  def authenticate_admin!
    unless current_admin
      render json: { error: 'Unauthorized. Admin access required.' }, status: :unauthorized
    end
  end

  def set_company
    @company = Company.find(params[:id])
  rescue ActiveRecord::RecordNotFound
    render json: { error: 'Không tìm thấy công ty' }, status: :not_found
  end

  def company_params
    params.require(:company).permit(
      :name, :description, :website, :company_size, 
      :industry, :company_type, :country_id, :status,
      company_addresses_attributes: [:id, :province, :full_address, :_destroy],
      company_social_links_attributes: [:id, :link_type, :url, :_destroy],
    )
  end
end
