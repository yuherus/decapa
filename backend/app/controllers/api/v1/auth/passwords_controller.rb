module Api
  module V1
    module Auth
      class PasswordsController < Devise::PasswordsController
        respond_to :json
        skip_before_action :verify_authenticity_token, if: :json_request?
        
        # Gửi email đặt lại mật khẩu
        def create
          self.resource = resource_class.send_reset_password_instructions(resource_params)
          
          if successfully_sent?(resource)
            render json: {
              status: { code: 200, message: 'Hướng dẫn đặt lại mật khẩu đã được gửi đến email của bạn' }
            }
          else
            render json: {
              status: { code: 422, message: 'Không thể gửi hướng dẫn đặt lại mật khẩu' },
              errors: resource.errors.full_messages
            }, status: :unprocessable_entity
          end
        end
        
        # Cập nhật mật khẩu mới
        def update
          self.resource = resource_class.reset_password_by_token(resource_params)
          
          if resource.errors.empty?
            render json: {
              status: { code: 200, message: 'Mật khẩu đã được cập nhật thành công' }
            }
          else
            render json: {
              status: { code: 422, message: 'Không thể cập nhật mật khẩu' },
              errors: resource.errors.full_messages
            }, status: :unprocessable_entity
          end
        end
        
        private
        
        def json_request?
          request.format.json?
        end
      end
    end
  end
end 
