class Employer < ApplicationRecord
  belongs_to :account
  belongs_to :company

  enum gender: {male: 0, female: 1, other: 2}

  has_one_attached :avatar
  
  has_one :employer_setting, dependent: :destroy
  has_and_belongs_to_many :interviews, join_table: :interviewers
  has_and_belongs_to_many :saved_candidates, class_name: 'User', join_table: :saved_candidates 
end
