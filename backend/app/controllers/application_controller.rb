class ApplicationController < ActionController::API
  include Pagy::Backend
  include ActionController::Cookies
  include ActionController::RequestForgeryProtection
  
  protected
  
  def authenticate_account!
    header = request.headers['Authorization']
    return render_unauthorized unless header

    token = header.split(' ').last
    
    # Kiểm tra token có nằm trong blacklist không
    if TokenBlacklist.token_blacklisted?(token)
      return render json: { error: 'Token đã bị vô hiệu hóa' }, status: :unauthorized
    end
    
    begin
      decoded_token = decode_token(token)
      @current_account = Account.find(decoded_token[:sub])
    rescue JWT::ExpiredSignature
      render json: { error: 'Token đã hết hạn' }, status: :unauthorized
    rescue JWT::DecodeError, ActiveRecord::RecordNotFound
      render_unauthorized
    end
  end

  def render_unauthorized
    render json: { error: 'Token không hợp lệ hoặc không được cung cấp' }, status: :unauthorized
  end

  def encode_token(payload)
    JWT.encode(payload, jwt_secret_key, 'HS256')
  end

  def decode_token(token)
    decoded = JWT.decode(token, jwt_secret_key, true, { algorithm: 'HS256' })[0]
    HashWithIndifferentAccess.new(decoded)
  end

  def jwt_secret_key
    Rails.application.credentials.secret_key_base
  end

  def current_account
    @current_account
  end

  def account_signed_in?
    !!current_account
  end
  
  def current_user
    current_account&.user
  end

  def current_admin
    current_account&.admin
  end
  
  def current_employer
    current_account&.employer
  end
end
