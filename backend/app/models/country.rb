class Country < ApplicationRecord
  has_one_attached :logo

  has_many :companies, dependent: :nullify
end
