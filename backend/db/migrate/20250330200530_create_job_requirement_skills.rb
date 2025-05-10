class CreateJobRequirementSkills < ActiveRecord::Migration[7.0]
  def change
    create_table :job_requirement_skills do |t|
      t.references :job, null: false, foreign_key: true
      t.references :skill, null: false, foreign_key: true

      t.timestamps
    end
    add_index :job_requirement_skills, [:job_id, :skill_id], unique: true
  end
end
