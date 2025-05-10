class UserEducationSerializer < ActiveModel::Serializer
  attributes :id, :school, :major, :is_studying, :from_date, :to_date, :additional_details, :created_at, :updated_at
  
  belongs_to :user
end 
