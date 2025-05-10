class CreateUserExperiences < ActiveRecord::Migration[7.1]
  def change
    create_table :user_experiences do |t|
      t.references :user, null: false, foreign_key: true
      t.string :company
      t.string :position
      t.boolean :is_working
      t.date :from_date
      t.date :to_date
      t.text :additional_details

      t.timestamps
    end
  end
end
