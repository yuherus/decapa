class CreateUserSettings < ActiveRecord::Migration[7.1]
  def change
    create_table :user_settings do |t|
      t.references :user, null: false, foreign_key: true
      t.boolean :jobs_notification
      t.boolean :invitation_notification
      t.boolean :upcoming_interview_notification
      t.integer :upcoming_interview_notification_time
      t.boolean :resume_visibility
      t.boolean :jobs_email
      t.boolean :invitation_email
      t.boolean :upcoming_interview_email
      t.integer :upcoming_interview_email_time

      t.timestamps
    end
  end
end
