class Interview < ApplicationRecord
  belongs_to :application

  enum stage_type: {
    phone_interview: 0,
    technical_test: 1,
    culture_interview: 2,
    final_interview: 3
  }

  enum interview_type: {
    online: 0,
    offline: 1
  }

  has_and_belongs_to_many :interviewers, class_name: 'Employer', join_table: :interviewers
end
