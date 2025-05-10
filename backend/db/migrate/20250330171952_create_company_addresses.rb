class CreateCompanyAddresses < ActiveRecord::Migration[7.1]
  def change
    create_table :company_addresses do |t|
      t.string :province
      t.string :full_address
      t.references :company, null: false, foreign_key: true

      t.timestamps
    end
  end
end
