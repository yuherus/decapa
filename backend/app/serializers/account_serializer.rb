class AccountSerializer < ActiveModel::Serializer
  attributes :id, :email, :fullname, :created_at, :role, :updated_at

  def role 
    object.role 
  end
end 
