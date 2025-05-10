class Api::V1::UserSocialLinksController < Api::V1::SecuredController
  before_action :set_social_link, only: [:show, :update, :destroy]

  # GET /api/v1/user_social_links
  def index
    @social_links = current_user.user_social_links
    render json: @social_links, each_serializer: UserSocialLinkSerializer, status: :ok
  end

  # GET /api/v1/user_social_links/:id
  def show
    render json: @social_link, serializer: UserSocialLinkSerializer, status: :ok
  end

  # POST /api/v1/user_social_links
  def create
    @social_link = current_user.user_social_links.new(social_link_params)

    if @social_link.save
      render json: @social_link, serializer: UserSocialLinkSerializer, status: :created
    else
      render json: { errors: @social_link.errors.full_messages }, status: :unprocessable_entity
    end
  end

  # POST /api/v1/user_social_links/bulk_create
  def bulk_create
    social_links_params = params[:user_social_links]
    created_links = []
    errors = []

    social_links_params.each do |link_param|
      social_link = current_user.user_social_links.new(link_type: link_param[:link_type], url: link_param[:url])
      
      if social_link.save
        created_links << social_link
      else
        errors << { link_type: link_param[:link_type], errors: social_link.errors.full_messages }
      end
    end

    if errors.empty?
      render json: created_links, each_serializer: UserSocialLinkSerializer, status: :created
    else
      render json: { errors: errors }, status: :unprocessable_entity
    end
  end

  # PATCH/PUT /api/v1/user_social_links/:id
  def update
    if @social_link.update(social_link_params)
      render json: @social_link, serializer: UserSocialLinkSerializer, status: :ok
    else
      render json: { errors: @social_link.errors.full_messages }, status: :unprocessable_entity
    end
  end

  # DELETE /api/v1/user_social_links/:id
  def destroy
    @social_link.destroy
    head :no_content
  end

  private

  def set_social_link
    @social_link = current_user.user_social_links.find(params[:id])
  rescue ActiveRecord::RecordNotFound
    render json: { error: 'Social link not found' }, status: :not_found
  end

  def social_link_params
    params.require(:user_social_link).permit(:link_type, :url)
  end
end 
