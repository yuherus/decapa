class Api::V1::Enterprise::CompaniesController < Api::V1::SecuredController
  before_action :authenticate_employer!
  before_action :set_company, only: [:show, :update]

  # GET /api/v1/enterprise/company
  def show
    render json: @company, include: ['country', 'company_addresses', 'company_social_links', 'skills']
  end

  # PATCH/PUT /api/v1/enterprise/company
  def update
    params[:company][:company_size] = params[:company][:company_size].to_i if params[:company][:company_size].present?
    params[:company][:industry] = params[:company][:industry].to_i if params[:company][:industry].present?
    params[:company][:company_type] = params[:company][:company_type].to_i if params[:company][:company_type].present?
    
    # Enterprise không được phép thay đổi trạng thái công ty
    params[:company].delete(:status) if params[:company][:status].present?

    if @company.update(company_params)
      render json: @company
    else
      render json: { errors: @company.errors.full_messages }, status: :unprocessable_entity
    end
  end

  private

  def authenticate_employer!
    unless current_employer
      render json: { error: 'Bạn không có quyền truy cập' }, status: :unauthorized
    end
  end

  def set_company
    @company = current_employer.company
    unless @company
      render json: { error: 'Bạn chưa có công ty, vui lòng tạo công ty mới' }, status: :not_found
    end
  end

  def company_params
    params.require(:company).permit(
      :name, :description, :website, :company_size, 
      :industry, :company_type, :country_id,
      :logo, :banner, images: [],
      company_addresses_attributes: [:id, :province, :full_address, :_destroy],
      company_social_links_attributes: [:id, :link_type, :url, :_destroy],
      skill_ids: []
    )
  end
end 
