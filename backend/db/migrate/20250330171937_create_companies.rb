class CreateCompanies < ActiveRecord::Migration[7.1]
  def change
    create_table :companies do |t|
      t.string :name
      t.text :description
      t.integer :company_type
      t.integer :industry
      t.integer :company_size
      t.string :website
      t.references :country, null: false, foreign_key: true

      t.timestamps
    end
  end
end
