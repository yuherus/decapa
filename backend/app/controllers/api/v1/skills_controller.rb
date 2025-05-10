class Api::V1::SkillsController < ApplicationController
  def index
    @skills = Skill.all
    render json: @skills, each_serializer: SkillSerializer, status: :ok
  end

  def show
    @skill = Skill.find(params[:id])
    render json: @skill, serializer: SkillSerializer, status: :ok
  rescue ActiveRecord::RecordNotFound
    render json: { error: 'Skill not found' }, status: :not_found
  end

  def create
    skill = Skill.new(skill_params)

    if skill.save
      render json: skill, status: :created
    else
      render json: { errors: skill.errors.full_messages }, status: :unprocessable_entity
    end
  end

  private

  def skill_params
    params.require(:skill).permit(:skill_name)
  end
end 
