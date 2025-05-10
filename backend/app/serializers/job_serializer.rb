class JobSerializer < ActiveModel::Serializer
  attributes :id, :title, :description, :requirements, :benefit, 
             :job_type, :contract_type, :min_salary, :max_salary, 
             :experience, :expired_at, :created_at, :updated_at, :status,
             :currency, :salary_period, :display_salary
  
  belongs_to :company
  belongs_to :company_address
  has_many :skills

  def job_type
    object.job_type_before_type_cast
  end

  def contract_type
    object.contract_type_before_type_cast
  end

  def experience
    object.experience_before_type_cast
  end
  
  def status
    object.status_before_type_cast
  end
  
  def salary_period
    object.salary_period_before_type_cast
  end
end
