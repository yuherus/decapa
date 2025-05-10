class Api::V1::CompaniesController < Api::V1::SecuredController
  before_action :set_company, only: [:show, :follow, :unfollow]

  # GET /api/v1/companies
  def index
    @q = Company.includes(:country, :company_addresses, :jobs).ransack(params[:q])
    @q.sorts = 'created_at desc' if @q.sorts.empty?
    
    pagy, companies = pagy(@q.result(distinct: true), items: params[:per_page] || 12)
    
    render json: {
      companies: ActiveModelSerializers::SerializableResource.new(companies),
      metadata: pagy_metadata(pagy)
    }
  end
  
  # GET /api/v1/companies/:id
  def show
    render json: @company, include: ['country', 'company_addresses', 'company_social_links', 'jobs']
  end

  # POST /api/v1/companies/:id/follow
  def follow
    if current_user.followed_companies.include?(@company)
      render json: { message: 'Bạn đã follow công ty này rồi' }, status: :unprocessable_entity
    else
      current_user.followed_companies << @company
      render json: { message: 'Follow công ty thành công' }, status: :ok
    end
  end

  # DELETE /api/v1/companies/:id/unfollow
  def unfollow
    if current_user.followed_companies.include?(@company)
      current_user.followed_companies.delete(@company)
      render json: { message: 'Unfollow công ty thành công' }, status: :ok
    else
      render json: { message: 'Bạn chưa follow công ty này' }, status: :unprocessable_entity
    end
  end
  
  private
  
  def set_company
    @company = Company.find(params[:id])
  rescue ActiveRecord::RecordNotFound
    render json: { error: 'Không tìm thấy công ty' }, status: :not_found
  end
  
  def company_params
    params.require(:company).permit(:name, :description, :website, :company_size, :industry, :company_type, :country_id)
  end
end
