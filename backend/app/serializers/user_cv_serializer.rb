class UserCvSerializer < ActiveModel::Serializer
  include Rails.application.routes.url_helpers
  
  attributes :id, :name, :is_default, :created_at, :updated_at, :file_url, :file_name
  
  def file_url
    if object.file.attached?
      # Sử dụng rails_blob_path thay vì rails_blob_url để tránh lỗi host
      rails_blob_path(object.file, only_path: true)
    end
  end
  
  def file_name
    object.file.filename.to_s if object.file.attached?
  end
end 
