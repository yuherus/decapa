class UserProjectSerializer < ActiveModel::Serializer
  attributes :id, :project_name, :description, :is_working, :from_date, :to_date, :url, :created_at, :updated_at
  
  belongs_to :user
end 
