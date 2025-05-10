class CreateUserSocialLinks < ActiveRecord::Migration[7.1]
  def change
    create_table :user_social_links do |t|
      t.references :user, null: false, foreign_key: true
      t.integer :link_type
      t.string :url

      t.timestamps
    end
  end
end
