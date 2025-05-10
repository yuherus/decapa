module Api
  module V1
    module Auth
      class OmniauthCallbacksController < ApplicationController
        include ActionController::Cookies
        include ActionController::RequestForgeryProtection
        
        skip_before_action :verify_authenticity_token, only: [:facebook, :google_oauth2]
        
        def facebook
          handle_auth "Facebook"
        end
        
        def google_oauth2
          handle_auth "Google"
        end
        
        private
        
        def generate_token(account)
          encode_token(
            { 
              sub: account.id, 
              exp: 24.hours.from_now.to_i,
              iat: Time.now.to_i
            }
          )
        end
        
        def handle_auth(provider)
          @account = Account.from_omniauth(request.env["omniauth.auth"])
          
          if @account.persisted?            
            token = generate_token(@account)
            
            # Nếu là API request, trả về JSON
            if request.format.json?
              render json: {
                status: { code: 200, message: "Đăng nhập thành công qua #{provider}" },
                data: {
                  account: @account,
                  token: token
                }
              }
            else
              # Nếu là web request, redirect với token
              redirect_to "#{ENV['FRONTEND_URL']}/auth/callback?token=#{token}"
            end
          else
            # Lưu thông tin OAuth vào session để hoàn tất đăng ký
            session["#{provider.downcase}_data"] = request.env["omniauth.auth"].except("extra")
            
            if request.format.json?
              render json: {
                status: { code: 422, message: "Đăng nhập qua #{provider} thất bại" },
                errors: @account.errors.full_messages
              }, status: :unprocessable_entity
            else
              redirect_to "#{ENV['FRONTEND_URL']}/auth/register"
            end
          end
        end
      end
    end
  end
end 
