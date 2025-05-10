class CreateUserEducations < ActiveRecord::Migration[7.1]
  def change
    create_table :user_educations do |t|
      t.references :user, null: false, foreign_key: true
      t.string :school
      t.string :major
      t.boolean :is_studying
      t.date :from_date
      t.date :to_date
      t.text :additional_details

      t.timestamps
    end
  end
end
