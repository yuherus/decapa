class EmployerSetting < ApplicationRecord
  belongs_to :employer

  enum upcoming_interview_notification_time: {
    one_hour_before: 0,
    one_day_before: 1,
    one_week_before: 2
  }, _prefix: :notification

  enum upcoming_interview_email_time: {
    one_hour_before: 0,
    one_day_before: 1,
    one_week_before: 2
  }, _prefix: :email
end
