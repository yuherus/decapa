class CreateInvoices < ActiveRecord::Migration[7.1]
  def change
    create_table :invoices do |t|
      t.references :company_plan, null: false, foreign_key: true
      t.string :invoice_number
      t.date :issued_date
      t.decimal :amout
      t.date :due_date

      t.timestamps
    end
  end
end
