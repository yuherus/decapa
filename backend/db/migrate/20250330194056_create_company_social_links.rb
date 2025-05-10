class CreateCompanySocialLinks < ActiveRecord::Migration[7.1]
  def change
    create_table :company_social_links do |t|
      t.references :company, null: false, foreign_key: true
      t.integer :link_type
      t.string :url

      t.timestamps
    end
  end
end
