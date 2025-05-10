class CreateAdminSettings < ActiveRecord::Migration[7.1]
  def change
    create_table :admin_settings do |t|
      t.references :admin, null: false, foreign_key: true
      t.integer :data_backup_frequency
      t.boolean :jobs_posting_approval
      t.boolean :need_approve_job_notification
      t.boolean :need_approve_reviews_notification
      t.boolean :success_payment_notification
      t.boolean :need_approve_job_email
      t.boolean :need_approve_reviews_email
      t.boolean :success_payment_email

      t.timestamps
    end
  end
end
