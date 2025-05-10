class CreateUsers < ActiveRecord::Migration[7.1]
  def change
    create_table :users do |t|
      t.date :dob
      t.string :address
      t.string :phonenum
      t.integer :gender
      t.string :headline
      t.text :bio
      t.references :account, null: false, foreign_key: true

      t.timestamps
    end
  end
end
