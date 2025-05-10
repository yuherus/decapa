class CreateJobs < ActiveRecord::Migration[7.1]
  def change
    create_table :jobs do |t|
      t.string :title
      t.text :description
      t.text :requirements
      t.text :benefit
      t.integer :job_type
      t.integer :contract_type
      t.decimal :min_salary
      t.decimal :max_salary
      t.integer :experience
      t.datetime :expired_at
      t.references :company, null: false, foreign_key: true
      t.references :company_address, null: false, foreign_key: true

      t.timestamps
    end
  end
end
