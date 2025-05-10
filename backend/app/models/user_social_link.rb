class UserSocialLink < ApplicationRecord
  belongs_to :user

  enum link_type: {facebook: 0, linkedin: 1, github: 2, instagram: 3, youtube: 4}
end
