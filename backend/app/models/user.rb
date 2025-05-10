class User < ApplicationRecord
  belongs_to :account

  has_one_attached :avatar

  has_many :user_cvs, dependent: :destroy
  has_many :user_social_links, dependent: :destroy
  has_many :user_skills, dependent: :destroy
  has_many :skills, through: :user_skills
  has_many :user_educations, dependent: :destroy
  has_many :user_experiences, dependent: :destroy
  has_many :user_projects, dependent: :destroy
  has_many :user_certificates, dependent: :destroy
  has_many :user_awards, dependent: :destroy
  has_many :favorite_jobs, dependent: :destroy
  has_many :jobs, through: :favorite_jobs
  has_many :applications, dependent: :destroy
  has_many :email_subscriptions, dependent: :destroy
  has_one :user_setting, dependent: :destroy

  has_and_belongs_to_many :followed_companies, class_name: 'Company', join_table: :user_follow_companies
  has_and_belongs_to_many :favorite_jobs, class_name: 'Job', join_table: :favorite_jobs
  has_and_belongs_to_many :employers, join_table: :saved_candidates

  accepts_nested_attributes_for :account

  enum gender: {male: 0, female: 1, other: 2}
end
