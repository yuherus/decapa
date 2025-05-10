class CreateInterviewers < ActiveRecord::Migration[7.0]
  def change
    create_table :interviewers do |t|
      t.references :interview, null: false, foreign_key: true
      t.references :employer, null: false, foreign_key: true

      t.timestamps
    end
    add_index :interviewers, [:interview_id, :employer_id], unique: true
  end
end
