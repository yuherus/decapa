class Invoice < ApplicationRecord
  belongs_to :company_plan

  has_one :payment, dependent: :destroy
end
