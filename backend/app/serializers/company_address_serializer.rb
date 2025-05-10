class CompanyAddressSerializer < ActiveModel::Serializer
  attributes :id, :province, :full_address
end
