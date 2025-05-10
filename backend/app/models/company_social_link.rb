class CompanySocialLink < ApplicationRecord
  belongs_to :company

  enum link_type: {facebook: 0, linkedin: 1, instagram: 2, youtube: 3}
end
