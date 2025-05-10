class AdminSetting < ApplicationRecord
  belongs_to :admin

  enum data_backup_frequency: {
    per_one_day: 0,
    per_one_week: 1,
    per_one_month: 2
  }
end
