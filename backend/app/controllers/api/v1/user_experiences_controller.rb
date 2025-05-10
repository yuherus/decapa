class Api::V1::UserExperiencesController < Api::V1::SecuredController
  before_action :set_experience, only: [:show, :update, :destroy]

  # GET /api/v1/user_experiences
  def index
    @experiences = current_user.user_experiences
    render json: @experiences, each_serializer: UserExperienceSerializer, status: :ok
  end

  # GET /api/v1/user_experiences/:id
  def show
    render json: @experience, serializer: UserExperienceSerializer, status: :ok
  end

  # POST /api/v1/user_experiences
  def create
    @experience = current_user.user_experiences.new(experience_params)

    if @experience.save
      render json: @experience, serializer: UserExperienceSerializer, status: :created
    else
      render json: { errors: @experience.errors.full_messages }, status: :unprocessable_entity
    end
  end

  # PATCH/PUT /api/v1/user_experiences/:id
  def update
    if @experience.update(experience_params)
      render json: @experience, serializer: UserExperienceSerializer, status: :ok
    else
      render json: { errors: @experience.errors.full_messages }, status: :unprocessable_entity
    end
  end

  # DELETE /api/v1/user_experiences/:id
  def destroy
    @experience.destroy
    head :no_content
  end

  private

  def set_experience
    @experience = current_user.user_experiences.find(params[:id])
  rescue ActiveRecord::RecordNotFound
    render json: { error: 'Experience not found' }, status: :not_found
  end

  def experience_params
    params.require(:user_experience).permit(
      :company, :position, :is_working, :from_date, :to_date, :additional_details
    )
  end
end 
