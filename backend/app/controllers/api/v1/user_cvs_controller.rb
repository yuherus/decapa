class Api::V1::UserCvsController < Api::V1::SecuredController
  before_action :set_user_cv, only: [:show, :update, :destroy, :set_default, :download]
  
  def index
    @user_cvs = current_user.user_cvs
    render json: @user_cvs, each_serializer: UserCvSerializer, status: :ok
  end
  
  def show
    render json: @user_cv, serializer: UserCvSerializer, status: :ok
  end
  
  def create
    @user_cv = current_user.user_cvs.new(user_cv_params)
    
    # Nếu không có CV nào, đặt CV mới làm mặc định
    @user_cv.is_default = true if current_user.user_cvs.count == 0
    
    if @user_cv.save
      render json: @user_cv, serializer: UserCvSerializer, status: :created
    else
      render json: { errors: @user_cv.errors.full_messages }, status: :unprocessable_entity
    end
  end
  
  def update
    if @user_cv.update(user_cv_params)
      render json: @user_cv, serializer: UserCvSerializer, status: :ok
    else
      render json: { errors: @user_cv.errors.full_messages }, status: :unprocessable_entity
    end
  end
  
  def destroy
    @user_cv.destroy
    head :no_content
  end
  
  def set_default
    @user_cv.update(is_default: true)
    render json: @user_cv, serializer: UserCvSerializer, status: :ok
  end
  
  def download
    if @user_cv.file.attached?
      redirect_to rails_blob_path(@user_cv.file, disposition: "attachment")
    else
      render json: { error: 'CV file not found' }, status: :not_found
    end
  end
  
  private
  
  def set_user_cv
    @user_cv = current_user.user_cvs.find(params[:id])
  rescue ActiveRecord::RecordNotFound
    render json: { error: 'CV not found' }, status: :not_found
  end
  
  def user_cv_params
    params.require(:user_cv).permit(:name, :is_default, :file)
  end
end
