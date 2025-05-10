class Job < ApplicationRecord
  belongs_to :company
  accepts_nested_attributes_for :company
  belongs_to :company_address

  has_many :applications, dependent: :destroy
  has_and_belongs_to_many :skills, join_table: :job_requirement_skills
  has_and_belongs_to_many :users, join_table: :favorite_jobs

  enum job_type: {
    office: 0,
    remote: 1,
    hybrid: 2
  }

  enum contract_type: {
    fulltime: 0,
    parttime: 1,
    freelance: 2,
    internship: 3
  }

  enum experience: {
    no_experience: 0,  
    fresher: 1,
    junior: 2,
    senior: 3,
    manager: 4
  }

  enum status: {
    pending: 0,
    active: 1,
    closed: 2
  }
  
  enum salary_period: {
    daily: 0,
    monthly: 1,
    yearly: 2
  }

  def self.ransackable_attributes(auth_object = nil)
    %w(title description requirements benefit job_type contract_type experience min_salary max_salary created_at expired_at updated_at status currency salary_period display_salary)
  end

  def self.ransackable_associations(auth_object = nil)
    %w(company company_address)
  end
end
