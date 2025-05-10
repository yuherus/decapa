class CreateUserProjects < ActiveRecord::Migration[7.1]
  def change
    create_table :user_projects do |t|
      t.references :user, null: false, foreign_key: true
      t.string :project_name
      t.text :description
      t.boolean :is_working
      t.date :from_date
      t.date :to_date
      t.string :url

      t.timestamps
    end
  end
end
