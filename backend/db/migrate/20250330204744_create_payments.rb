class CreatePayments < ActiveRecord::Migration[7.1]
  def change
    create_table :payments do |t|
      t.integer :payment_method
      t.integer :status
      t.date :paid_at

      t.timestamps
    end
  end
end
