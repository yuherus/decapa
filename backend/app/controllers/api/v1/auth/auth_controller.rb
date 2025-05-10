module Api
  module V1
    module Auth
      class AuthController < ApplicationController
        before_action :authenticate_account!, only: [:logout, :verify_token]
        
        # Đăng nhập
        def login
          account = Account.find_by(email: account_params[:email])
          
          if account&.valid_password?(account_params[:password])
            # Kiểm tra nếu đăng nhập vào trang admin mà không phải là admin
            if params[:account][:role] == 'admin' && !account.admin.present?
              render json: {
                status: { code: 401, message: 'Tài khoản không có quyền admin' }
              }, status: :unauthorized
              return
            end
            
            # Kiểm tra nếu đăng nhập vào trang enterprise mà không phải là enterprise
            if params[:account][:role] == 'enterprise' && !account.employer.present?
              render json: {
                status: { code: 401, message: 'Tài khoản không phải tài khoản enterprise' }
              }, status: :unauthorized
              return
            end

            if params[:account][:role] == 'user' && !account.user.present?
              render json: {
                status: { code: 401, message: 'Tài khoản không phải tài khoản user' }
              }, status: :unauthorized
              return
            end
            
            token = generate_token(account)
            
            render json: {
              status: { code: 200, message: 'Đăng nhập thành công' },
              data: {
                account: AccountSerializer.new(account),
                token: token
              }
            }
          else
            render json: {
              status: { code: 401, message: 'Email hoặc mật khẩu không đúng' }
            }, status: :unauthorized
          end
        end
        
        # Đăng ký
        def register
          account = Account.new(account_params)
          
          if account.save
            # Tạo user profile khi đăng ký thành công
            account.build_user(headline: account.fullname)
            account.user.save
            
            token = generate_token(account)
            
            render json: {
              status: { code: 200, message: 'Đăng ký thành công' },
              data: {
                account: AccountSerializer.new(account),
                token: token
              }
            }
          else
            render json: {
              status: { code: 422, message: 'Đăng ký thất bại' },
              errors: account.errors.full_messages
            }, status: :unprocessable_entity
          end
        end
        
        # Đăng xuất (thêm token vào blacklist)
        def logout
          header = request.headers['Authorization']
          token = header.split(' ').last if header
          
          if token
            begin
              decoded_token = decode_token(token)
              TokenBlacklist.blacklist_token(token, decoded_token)
            rescue JWT::DecodeError
              # Không làm gì nếu token không hợp lệ
            end
          end
          
          render json: {
            status: { code: 200, message: 'Đăng xuất thành công' }
          }
        end
        
        # Xác thực token
        def verify_token
          render json: {
            status: { code: 200, message: 'Token hợp lệ' },
            data: {
              account: current_account
            }
          }
        end
        
        private
        
        def generate_token(account)
          encode_token(
            { 
              sub: account.id, 
              exp: 24.hours.from_now.to_i,
              iat: Time.now.to_i,
              role: account.role
            }
          )
        end
        
        def account_params
          params.require(:account).permit(:email, :password, :password_confirmation, :fullname)
        end
        
        def json_request?
          request.format.json?
        end
      end
    end
  end
end 
