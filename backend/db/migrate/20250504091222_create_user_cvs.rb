class CreateUserCvs < ActiveRecord::Migration[7.1]
  def change
    create_table :user_cvs do |t|
      t.references :user, null: false, foreign_key: true
      t.string :name, null: false
      t.boolean :is_default, default: false
      t.timestamps
    end
  end
end
