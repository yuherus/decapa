class Api::V1::UserSkillsController < Api::V1::SecuredController
  before_action :set_user_skill, only: [:show, :update, :destroy]

  # GET /api/v1/user_skills
  def index
    @user_skills = current_user.user_skills.includes(:skill)
    render json: @user_skills, each_serializer: UserSkillSerializer, status: :ok
  end

  # GET /api/v1/user_skills/:id
  def show
    render json: @user_skill, serializer: UserSkillSerializer, status: :ok
  end

  # POST /api/v1/user_skills
  def create
    # First, find or create the skill
    skill = Skill.find_or_create_by(name: params[:skill_name]) if params[:skill_name].present?
    
    if skill || params[:user_skill][:skill_id].present?
      @user_skill = current_user.user_skills.new(user_skill_params)
      @user_skill.skill_id = skill.id if skill
      
      if @user_skill.save
        render json: @user_skill, serializer: UserSkillSerializer, status: :created
      else
        render json: { errors: @user_skill.errors.full_messages }, status: :unprocessable_entity
      end
    else
      render json: { error: 'Either skill_id or skill_name is required' }, status: :bad_request
    end
  end

  # POST /api/v1/user_skills/bulk_create
  def bulk_create
    skills_params = params[:user_skills]
    created_skills = []
    errors = []

    skills_params.each do |skill_param|
      user_skill = current_user.user_skills.new(skill_id: skill_param[:skill_id], level: skill_param[:level])
      
      if user_skill.save
        created_skills << user_skill
      else
        errors << { skill_id: skill_param[:skill_id], errors: user_skill.errors.full_messages }
      end
    end

    if errors.empty?
      render json: created_skills, each_serializer: UserSkillSerializer, status: :created
    else
      render json: { errors: errors }, status: :unprocessable_entity
    end
  end

  # PATCH/PUT /api/v1/user_skills/:id
  def update
    if @user_skill.update(user_skill_params)
      render json: @user_skill, serializer: UserSkillSerializer, status: :ok
    else
      render json: { errors: @user_skill.errors.full_messages }, status: :unprocessable_entity
    end
  end

  # DELETE /api/v1/user_skills/:id
  def destroy
    @user_skill.destroy
    head :no_content
  end

  private

  def set_user_skill
    @user_skill = current_user.user_skills.find(params[:id])
  rescue ActiveRecord::RecordNotFound
    render json: { error: 'Skill not found' }, status: :not_found
  end

  def user_skill_params
    params.require(:user_skill).permit(:skill_id, :level)
  end
end 
