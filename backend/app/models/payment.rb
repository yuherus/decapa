class Payment < ApplicationRecord
  belongs_to :invoice

  enum status: {
    pending: 0,
    completed: 1,
    failed: 2,
    overdue: 3
  }

  enum payment_method: {
    credit_card: 0,
    debit_card: 1,
    momo: 2,
    bank_transfer: 3,
    vnpay: 4,
  }
end
