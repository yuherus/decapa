class CreatePlans < ActiveRecord::Migration[7.1]
  def change
    create_table :plans do |t|
      t.string :name
      t.string :short_description
      t.text :description
      t.decimal :price
      t.integer :duration

      t.timestamps
    end
  end
end
