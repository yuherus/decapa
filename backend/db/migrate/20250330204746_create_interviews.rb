class CreateInterviews < ActiveRecord::Migration[7.1]
  def change
    create_table :interviews do |t|
      t.references :application, null: false, foreign_key: true
      t.integer :stage_number
      t.integer :stage_type
      t.datetime :interview_time
      t.integer :interview_type
      t.string :interview_location
      t.text :note
      t.text :feedback
      t.integer :rating

      t.timestamps
    end
  end
end
