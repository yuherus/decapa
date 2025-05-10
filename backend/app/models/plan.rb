class Plan < ApplicationRecord
  has_many :company_plans, dependent: :destroy
  has_many :companies, through: :company_plans
end
