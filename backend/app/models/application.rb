class Application < ApplicationRecord
  belongs_to :user
  belongs_to :job
  belongs_to :user_cv, optional: true

  has_one_attached :cv
  has_many :interviews, dependent: :destroy

  validates :full_name, presence: true
  validates :email, presence: true, format: { with: URI::MailTo::EMAIL_REGEXP }
  validates :phone, presence: true

  enum status: {
    pending: 0,
    reviewing: 1,
    interview: 2,
    accepted: 3,
    rejected: 4
  }

  # Đảm bảo hoặc có user_cv_id hoặc có file CV đính kèm
  validate :ensure_cv_exists
  
  # Callback để theo dõi sự thay đổi trạng thái
  after_save :handle_status_change, if: :saved_change_to_status?

  private

  def ensure_cv_exists
    if user_cv.blank? && !cv.attached?
      errors.add(:base, "Cần có CV để ứng tuyển")
    end
  end
  
  # Xử lý khi trạng thái của đơn ứng tuyển thay đổi
  def handle_status_change
    # Khi chuyển trạng thái thành "interview", tạo bản ghi phỏng vấn mới
    if status == "interview" && saved_change_to_status.first != "interview"
      # Tự động tạo một bản ghi phỏng vấn mới 
      # Thời gian mặc định là 7 ngày sau, có thể thay đổi sau
      interview = interviews.new(
        title: "Phỏng vấn cho #{job.title}",
        interview_type: "online", # Mặc định là phỏng vấn online
        scheduled_at: 7.days.from_now.change(hour: 9), # Mặc định 9 giờ sáng, 7 ngày sau
        status: "scheduled",
        notes: "Vui lòng chuẩn bị đầy đủ các tài liệu liên quan đến kinh nghiệm và kỹ năng của bạn. Chúng tôi sẽ liên hệ với bạn để xác nhận thời gian cụ thể."
      )
      
      if interview.save
        # Gửi email thông báo phỏng vấn
        ApplicationNotificationMailer.interview_invitation(id, interview.id).deliver_later
      end
    end
  end
end
