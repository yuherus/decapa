class AddInvoiceToPayments < ActiveRecord::Migration[7.1]
  def change
    add_reference :payments, :invoice, null: false, foreign_key: true
  end
end
