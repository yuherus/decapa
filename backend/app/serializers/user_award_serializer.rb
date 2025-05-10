class UserAwardSerializer < ActiveModel::Serializer
  attributes :id, :award_name, :organization, :issue_date, :description, :created_at, :updated_at
  
  belongs_to :user
end 
