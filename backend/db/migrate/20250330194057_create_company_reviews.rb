class CreateCompanyReviews < ActiveRecord::Migration[7.1]
  def change
    create_table :company_reviews do |t|
      t.text :review
      t.integer :total_rating
      t.boolean :recommended
      t.text :like
      t.text :improvement
      t.integer :salary_benefit_rating
      t.integer :culture_environment_rating
      t.integer :office_workspace_rating
      t.integer :opportunities_rating
      t.integer :leader_management_rating
      t.integer :workload_pressure_rating
      t.references :company, null: false, foreign_key: true

      t.timestamps
    end
  end
end
