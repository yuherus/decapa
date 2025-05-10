class UserCv < ApplicationRecord
  belongs_to :user
  
  has_one_attached :file
  
  validates :name, presence: true
  validates :file, presence: true
  
  after_save :ensure_only_one_default, if: -> { is_default? }
  
  private
  
  def ensure_only_one_default
    user.user_cvs.where.not(id: id).update_all(is_default: false)
  end
end 
