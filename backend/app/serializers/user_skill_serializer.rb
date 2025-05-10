class UserSkillSerializer < ActiveModel::Serializer
  attributes :id, :level, :created_at, :updated_at
  
  belongs_to :user
  belongs_to :skill
end 
