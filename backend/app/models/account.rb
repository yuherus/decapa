class Account < ApplicationRecord
  devise :database_authenticatable, :registerable,
         :recoverable, :rememberable, :validatable,
         :omniauthable,
         omniauth_providers: [:facebook, :google_oauth2]
         
  has_one :user, dependent: :destroy
  has_one :employer, dependent: :destroy
  has_one :admin, dependent: :destroy
  has_one :general_setting, dependent: :destroy
  has_many :notifications, dependent: :destroy

  def role
    return 'admin' if admin.present?
    return 'employer' if employer.present?
    return 'user' if user.present?
  end

  def self.from_omniauth(auth)
    where(provider: auth.provider, uid: auth.uid).first_or_create do |account|
      account.email = auth.info.email
      account.password = Devise.friendly_token[0, 20]
      account.fullname = auth.info.name
      account.build_user(
        headline: auth.info.name,
        avatar_url: auth.info.image
      )
    end
  end
end
