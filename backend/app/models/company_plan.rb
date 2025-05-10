class CompanyPlan < ApplicationRecord
  belongs_to :company
  belongs_to :plan

  has_many :invoices, dependent: :destroy
end
