class AddFieldsToApplications < ActiveRecord::Migration[7.1]
  def change
    add_column :applications, :full_name, :string
    add_column :applications, :email, :string
    add_column :applications, :phone, :string
    add_column :applications, :cover_letter, :text
    add_column :applications, :status, :integer
    
    add_reference :applications, :user_cv, foreign_key: true
  end
end
