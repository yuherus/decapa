class Company < ApplicationRecord
  belongs_to :country

  has_one_attached :logo
  has_one_attached :banner
  has_many_attached :images
  
  has_many :employers, dependent: :destroy
  has_many :jobs, dependent: :destroy
  has_many :company_addresses, dependent: :destroy
  has_many :company_social_links, dependent: :destroy
  has_many :company_reviews, dependent: :destroy
  has_many :company_plans, dependent: :destroy
  has_many :plans, through: :company_plans

  has_and_belongs_to_many :skills, join_table: :company_key_skills
  has_and_belongs_to_many :followers, class_name: 'User', join_table: :user_follow_companies

  accepts_nested_attributes_for :company_addresses, allow_destroy: true
  accepts_nested_attributes_for :company_social_links, allow_destroy: true

  enum company_size: {
    small: 0,      # Dưới 50 nhân viên
    medium: 1,     # 50 - 250 nhân viên
    large: 2,      # Trên 250 nhân viên
    enterprise: 3  # Trên 1000 nhân viên
  }

  enum industry: {
    technology: 0,
    finance: 1,
    healthcare: 2,
    education: 3,
    retail: 4,
    manufacturing: 5,
    entertainment: 6
  }

  enum company_type: {
    private_company: 0,
    public_company: 1,
    government: 2,
    nonprofit: 3,
    startup: 4
  }
  
  enum status: {
    pending: 0,    # Chờ xác minh
    active: 1,     # Đã xác minh, đang hoạt động
    verified: 2,   # Đã xác minh, có tick xanh
    inactive: 3    # Bị khóa
  }

  def self.ransackable_attributes(auth_object = nil)
    %w(name description website company_size industry company_type status created_at updated_at)
  end

  def self.ransackable_associations(auth_object = nil)
    %w(country company_addresses jobs)
  end
  
  def company_size_text
    case company_size
    when "small" then "Dưới 50 nhân viên"
    when "medium" then "50 - 250 nhân viên"
    when "large" then "Trên 250 nhân viên"
    when "enterprise" then "Trên 1000 nhân viên"
    else "Không xác định"
    end
  end
  
  def industry_text
    case industry
    when "technology" then "Công nghệ thông tin"
    when "finance" then "Tài chính - Ngân hàng"
    when "healthcare" then "Y tế - Dược phẩm"
    when "education" then "Giáo dục - Đào tạo"
    when "retail" then "Bán lẻ"
    when "manufacturing" then "Sản xuất"
    when "entertainment" then "Giải trí"
    else "Khác"
    end
  end
end
