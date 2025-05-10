class UserSerializer < ActiveModel::Serializer
  include Rails.application.routes.url_helpers
  
  attributes :id, :dob, :address, :phonenum, :gender, :headline, :bio, :email, :created_at, :updated_at, :avatar_url, :fullname

  def fullname
    object.account.fullname if object.account
  end

  def email
    object.account.email if object.account
  end
  
  def avatar_url
    if object.avatar.attached?
      rails_blob_url(object.avatar, only_path: true)
    else
      nil
    end
  end

  belongs_to :account
end 
