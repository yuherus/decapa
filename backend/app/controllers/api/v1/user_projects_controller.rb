class Api::V1::UserProjectsController < Api::V1::SecuredController
  before_action :set_project, only: [:show, :update, :destroy]

  # GET /api/v1/user_projects
  def index
    @projects = current_user.user_projects
    render json: @projects, each_serializer: UserProjectSerializer, status: :ok
  end

  # GET /api/v1/user_projects/:id
  def show
    render json: @project, serializer: UserProjectSerializer, status: :ok
  end

  # POST /api/v1/user_projects
  def create
    @project = current_user.user_projects.new(project_params)

    if @project.save
      render json: @project, serializer: UserProjectSerializer, status: :created
    else
      render json: { errors: @project.errors.full_messages }, status: :unprocessable_entity
    end
  end

  # PATCH/PUT /api/v1/user_projects/:id
  def update
    if @project.update(project_params)
      render json: @project, serializer: UserProjectSerializer, status: :ok
    else
      render json: { errors: @project.errors.full_messages }, status: :unprocessable_entity
    end
  end

  # DELETE /api/v1/user_projects/:id
  def destroy
    @project.destroy
    head :no_content
  end

  private

  def set_project
    @project = current_user.user_projects.find(params[:id])
  rescue ActiveRecord::RecordNotFound
    render json: { error: 'Project not found' }, status: :not_found
  end

  def project_params
    params.require(:user_project).permit(
      :project_name, :description, :is_working, :from_date, :to_date, :url
    )
  end
end 
