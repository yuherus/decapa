class UserSkill < ApplicationRecord
  belongs_to :user
  belongs_to :skill
  
  validates :user_id, uniqueness: { scope: :skill_id, message: "and skill combination already exists" }
  enum level: {
    beginner: 0,  
    intermediate: 1, 
    advanced: 2,
    expert: 3,
    master: 4
  }
end
