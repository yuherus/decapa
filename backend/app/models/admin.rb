class Admin < ApplicationRecord
  belongs_to :account

  enum role: {
    super_admin: 0,
    admin: 1,
    moderator: 2,
    support: 3
  }
end
