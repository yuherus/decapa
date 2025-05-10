class Skill < ApplicationRecord
  has_many :user_skills, dependent: :destroy
  has_many :users, through: :user_skills
  has_and_belongs_to_many :jobs, join_table: :job_requirement_skills
  has_and_belongs_to_many :companies, join_table: :company_key_skills
  has_many :email_subscriptions, dependent: :destroy

end
