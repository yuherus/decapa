class CreateEmailSubscriptions < ActiveRecord::Migration[7.1]
  def change
    create_table :email_subscriptions do |t|
      t.references :user, null: false, foreign_key: true
      t.references :skill, null: false, foreign_key: true
      t.string :location

      t.timestamps
    end
  end
end
