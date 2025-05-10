class Api::V1::UsersController < Api::V1::SecuredController
  before_action :set_user, only: [:show, :update]

  # GET /api/v1/users/profile
  def profile
    render json: {
      user: ActiveModelSerializers::SerializableResource.new(current_user, serializer: UserSerializer),
      user_educations: ActiveModelSerializers::SerializableResource.new(current_user.user_educations, each_serializer: UserEducationSerializer),
      user_experiences: ActiveModelSerializers::SerializableResource.new(current_user.user_experiences, each_serializer: UserExperienceSerializer),
      user_projects: ActiveModelSerializers::SerializableResource.new(current_user.user_projects, each_serializer: UserProjectSerializer),
      user_certificates: ActiveModelSerializers::SerializableResource.new(current_user.user_certificates, each_serializer: UserCertificateSerializer),
      user_awards: ActiveModelSerializers::SerializableResource.new(current_user.user_awards, each_serializer: UserAwardSerializer),
      user_skills: ActiveModelSerializers::SerializableResource.new(current_user.user_skills.includes(:skill), each_serializer: UserSkillSerializer),
      user_social_links: ActiveModelSerializers::SerializableResource.new(current_user.user_social_links, each_serializer: UserSocialLinkSerializer)
    }, status: :ok
  end

  # GET /api/v1/users/:id
  def show
    render json: @user, serializer: UserSerializer, status: :ok
  end

  # PATCH/PUT /api/v1/users/update_profile
  def update_profile
    ActiveRecord::Base.transaction do
      # Cập nhật thông tin tài khoản nếu có name
      if account_params.present?
        unless current_user.account.update(account_params)
          render json: { errors: current_user.account.errors.full_messages }, status: :unprocessable_entity
          return
        end
      end

      # Cập nhật thông tin user
      unless current_user.update(user_params)
        render json: { errors: current_user.errors.full_messages }, status: :unprocessable_entity
        return
      end

      render json: current_user, serializer: UserSerializer, status: :ok
    end
  rescue => e
    render json: { error: e.message }, status: :unprocessable_entity
  end

  private

  def set_user
    @user = User.find(params[:id])
  end

  def user_params
    params.require(:user).permit(
      :dob, :address, :phonenum, :gender, :headline, :bio, :avatar, :fullname
    )
  end

  def account_params
    params[:user][:account_attributes].present? ? params.require(:user).require(:account_attributes).permit(:fullname) : {}
  end
end 
