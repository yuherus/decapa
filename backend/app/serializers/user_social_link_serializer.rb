class UserSocialLinkSerializer < ActiveModel::Serializer
  attributes :id, :link_type, :url, :created_at, :updated_at
  
  belongs_to :user
end 
