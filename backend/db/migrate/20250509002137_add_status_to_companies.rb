class AddStatusToCompanies < ActiveRecord::Migration[7.1]
  def change
    add_column :companies, :status, :integer, default: 0
    add_index :companies, :status
  end
end 
