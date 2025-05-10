class CreateEmployerSettings < ActiveRecord::Migration[7.1]
  def change
    create_table :employer_settings do |t|
      t.references :employer, null: false, foreign_key: true
      t.boolean :new_application_notifications
      t.boolean :upcoming_interview_notification
      t.integer :upcoming_interview_notification_time
      t.boolean :expired_job_notification
      t.boolean :new_application_email
      t.boolean :upcoming_interview_email
      t.integer :upcoming_interview_email_time
      t.boolean :expired_job_email

      t.timestamps
    end
  end
end
