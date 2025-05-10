class AddIsDefaultToUserCvs < ActiveRecord::Migration[7.1]
  def change
    add_column :user_cvs, :is_default, :boolean, default: false, null: false unless column_exists?(:user_cvs, :is_default)
  end
end 
