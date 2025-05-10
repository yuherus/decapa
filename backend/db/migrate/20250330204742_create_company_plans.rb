class CreateCompanyPlans < ActiveRecord::Migration[7.1]
  def change
    create_table :company_plans do |t|
      t.references :company, null: false, foreign_key: true
      t.references :plan, null: false, foreign_key: true
      t.integer :status
      t.date :next_billing_date # vào ngày này hệ thống sẽ xuất hóa đơn (invoices) để công ty phải trả tiền nếu muốn tiếp tục duy trì subscriptions
      t.date :start_date
      t.date :end_date

      t.timestamps
    end
  end
end
