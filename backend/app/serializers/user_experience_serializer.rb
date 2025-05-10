class UserExperienceSerializer < ActiveModel::Serializer
  attributes :id, :company, :position, :is_working, :from_date, :to_date, :additional_details, :created_at, :updated_at
  
  belongs_to :user
end 
