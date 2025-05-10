class TokenBlacklist < ApplicationRecord
  validates :token, presence: true, uniqueness: true
  validates :expires_at, presence: true
  
  # Loại bỏ tokens hết hạn
  def self.prune_expired
    where("expires_at < ?", Time.now).delete_all
  end
  
  # Kiểm tra token có trong blacklist hay không
  def self.token_blacklisted?(token)
    exists?(token: token)
  end
  
  # Thêm token vào blacklist
  def self.blacklist_token(token, jwt_payload)
    expires_at = Time.at(jwt_payload[:exp])
    create(token: token, expires_at: expires_at)
  end
end 
