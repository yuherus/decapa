class CompanyKeySkillSerializer < ActiveModel::Serializer
  attributes :id, :skill_id
  belongs_to :skill
end 
