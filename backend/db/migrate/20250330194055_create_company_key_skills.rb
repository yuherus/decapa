class CreateCompanyKeySkills < ActiveRecord::Migration[7.0]
  def change
    create_table :company_key_skills do |t|
      t.references :company, null: false, foreign_key: true
      t.references :skill, null: false, foreign_key: true

      t.timestamps
    end
    add_index :company_key_skills, [:company_id, :skill_id], unique: true
  end
end
