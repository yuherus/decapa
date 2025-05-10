class Api::V1::UserEducationsController < Api::V1::SecuredController
  before_action :set_education, only: [:show, :update, :destroy]

  # GET /api/v1/user_educations
  def index
    @educations = current_user.user_educations
    render json: @educations, each_serializer: UserEducationSerializer, status: :ok
  end

  # GET /api/v1/user_educations/:id
  def show
    render json: @education, serializer: UserEducationSerializer, status: :ok
  end

  # POST /api/v1/user_educations
  def create
    @education = current_user.user_educations.new(education_params)

    if @education.save
      render json: @education, serializer: UserEducationSerializer, status: :created
    else
      render json: { errors: @education.errors.full_messages }, status: :unprocessable_entity
    end
  end

  # PATCH/PUT /api/v1/user_educations/:id
  def update
    if @education.update(education_params)
      render json: @education, serializer: UserEducationSerializer, status: :ok
    else
      render json: { errors: @education.errors.full_messages }, status: :unprocessable_entity
    end
  end

  # DELETE /api/v1/user_educations/:id
  def destroy
    @education.destroy
    head :no_content
  end

  private

  def set_education
    @education = current_user.user_educations.find(params[:id])
  rescue ActiveRecord::RecordNotFound
    render json: { error: 'Education not found' }, status: :not_found
  end

  def education_params
    params.require(:user_education).permit(
      :school, :major, :is_studying, :from_date, :to_date, :additional_details
    )
  end
end 
