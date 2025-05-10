class CreateNotifications < ActiveRecord::Migration[7.1]
  def change
    create_table :notifications do |t|
      t.references :account, null: false, foreign_key: true
      t.string :title
      t.text :content
      t.boolean :is_read
      t.string :url

      t.timestamps
    end
  end
end
