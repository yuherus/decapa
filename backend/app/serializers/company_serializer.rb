class CompanySerializer < ActiveModel::Serializer
  include Rails.application.routes.url_helpers
  
  attributes :id, :name, :description, :website, :company_size, :company_size_text,
             :industry, :industry_text, :company_type, :created_at, :updated_at,
             :logo_url, :banner_url, :image_urls, :status, :status_text,
             :open_positions, :open_positions_count, :is_followed
  
  belongs_to :country
  has_many :company_addresses
  has_many :company_social_links
  has_many :jobs, serializer: JobSerializer
  has_many :skills
  
  def company_size
    object.company_size_before_type_cast
  end

  def industry
    object.industry_before_type_cast
  end

  def company_type
    object.company_type_before_type_cast
  end
  
  def status
    object.status_before_type_cast
  end
  
  def status_text
    case object.status
    when "pending" then "Chờ duyệt"
    when "active" then "Hoạt động"
    when "verified" then "Đã xác minh"
    when "inactive" then "Bị khóa"
    else "Không xác định"
    end
  end
  
  def logo_url
    rails_blob_path(object.logo, only_path: true) if object.logo.attached?
  end
  
  def banner_url
    rails_blob_path(object.banner, only_path: true) if object.banner.attached?
  end
  
  def image_urls
    object.images.map { |image| rails_blob_path(image, only_path: true) } if object.images.attached?
  end
  
  def company_size_text
    object.company_size_text
  end
  
  def industry_text
    object.industry_text
  end
  
  def open_positions_count
    object.jobs.count
  end

  def open_positions
    object.jobs.includes(:company_address, :skills).map do |job|
      {
        id: job.id,
        title: job.title,
        location: job.company_address.province,
        job_type: job.job_type_before_type_cast,
        contract_type: job.contract_type_before_type_cast,
        experience: job.experience_before_type_cast,
        min_salary: job.min_salary,
        max_salary: job.max_salary,
        currency: job.currency,
        salary_period: job.salary_period_before_type_cast,
        display_salary: job.display_salary,
        created_at: job.created_at,
        expired_at: job.expired_at,
        skills: job.skills.map { |skill| skill.skill_name }
      }
    end
  end

  def is_followed
    return false unless scope
    scope.followed_companies.include?(object)
  end
end
