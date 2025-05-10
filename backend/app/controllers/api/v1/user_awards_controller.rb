class Api::V1::UserAwardsController < Api::V1::SecuredController
  before_action :set_award, only: [:show, :update, :destroy]

  # GET /api/v1/user_awards
  def index
    @awards = current_user.user_awards
    render json: @awards, each_serializer: UserAwardSerializer, status: :ok
  end

  # GET /api/v1/user_awards/:id
  def show
    render json: @award, serializer: UserAwardSerializer, status: :ok
  end

  # POST /api/v1/user_awards
  def create
    @award = current_user.user_awards.new(award_params)

    if @award.save
      render json: @award, serializer: UserAwardSerializer, status: :created
    else
      render json: { errors: @award.errors.full_messages }, status: :unprocessable_entity
    end
  end

  # PATCH/PUT /api/v1/user_awards/:id
  def update
    if @award.update(award_params)
      render json: @award, serializer: UserAwardSerializer, status: :ok
    else
      render json: { errors: @award.errors.full_messages }, status: :unprocessable_entity
    end
  end

  # DELETE /api/v1/user_awards/:id
  def destroy
    @award.destroy
    head :no_content
  end

  private

  def set_award
    @award = current_user.user_awards.find(params[:id])
  rescue ActiveRecord::RecordNotFound
    render json: { error: 'Award not found' }, status: :not_found
  end

  def award_params
    params.require(:user_award).permit(
      :award_name, :organization, :issue_date, :description
    )
  end
end 
