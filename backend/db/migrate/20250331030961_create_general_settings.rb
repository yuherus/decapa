class CreateGeneralSettings < ActiveRecord::Migration[7.1]
  def change
    create_table :general_settings do |t|
      t.integer :format_date
      t.integer :currency
      t.integer :default_languages
      t.integer :default_themes
      t.references :account, null: false, foreign_key: true

      t.timestamps
    end
  end
end
