class ApplicationNotificationMailer < ApplicationMailer
  # Thông báo khi đơn ứng tuyển được tạo thành công
  def application_submitted(application_id)
    @application = Application.includes(:job => :company).find_by(id: application_id)
    return unless @application
    
    @user = @application.user
    mail(
      to: @application.email,
      subject: "Đơn ứng tuyển đã được gửi thành công - #{@application.job.title}"
    )
  end
  
  # Thông báo khi đơn ứng tuyển có cập nhật trạng thái
  def application_status_updated(application_id)
    @application = Application.includes(:job => :company).find_by(id: application_id)
    return unless @application

    status_messages = {
      'pending' => 'Đơn của bạn đang chờ xem xét',
      'reviewing' => 'Đơn của bạn đang được xem xét',
      'interview' => 'Bạn đã được chọn để phỏng vấn!',
      'accepted' => 'Chúc mừng! Đơn ứng tuyển của bạn đã được chấp nhận.',
      'rejected' => 'Đơn ứng tuyển của bạn đã bị từ chối.'
    }
    
    @status_message = status_messages[@application.status] || 'Đơn ứng tuyển của bạn đã được cập nhật.'
    @dashboard_url = "#{ENV['FRONTEND_URL']}/dashboard/applied-jobs/#{@application.id}"
    
    mail(
      to: @application.email,
      subject: "Cập nhật đơn ứng tuyển - #{@application.job.title}"
    )
  end
  
  # Thông báo khi được mời phỏng vấn
  def interview_invitation(application_id, interview_id)
    @application = Application.includes(:job => :company).find_by(id: application_id)
    @interview = Interview.find_by(id: interview_id)
    return unless @application && @interview
    
    @user = @application.user
    @dashboard_url = "#{ENV['FRONTEND_URL']}/dashboard/interviews/#{@interview.id}"
    
    mail(
      to: @application.email,
      subject: "Mời phỏng vấn - #{@application.job.title}"
    )
  end
end 
