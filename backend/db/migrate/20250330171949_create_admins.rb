class CreateAdmins < ActiveRecord::Migration[7.1]
  def change
    create_table :admins do |t|
      t.integer :role
      t.string :phonenum
      t.references :account, null: false, foreign_key: true

      t.timestamps
    end
  end
end
