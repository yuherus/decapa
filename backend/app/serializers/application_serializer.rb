class ApplicationSerializer < ActiveModel::Serializer
  include Rails.application.routes.url_helpers
  
  attributes :id, :full_name, :email, :phone, :cover_letter, :status, :created_at, :updated_at, :cv_url
  
  belongs_to :user
  belongs_to :job
  belongs_to :user_cv, optional: true
  
  def status
    object.status
  end
  
  def cv_url
    if object.cv.attached?
      rails_blob_path(object.cv, only_path: true)
    elsif object.user_cv&.file&.attached?
      rails_blob_path(object.user_cv.file, only_path: true)
    else
      nil
    end
  end
end 
