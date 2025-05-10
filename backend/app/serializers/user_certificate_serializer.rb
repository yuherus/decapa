class UserCertificateSerializer < ActiveModel::Serializer
  attributes :id, :certificate_name, :organization, :issue_date, :description, :created_at, :updated_at
  
  belongs_to :user
end 
