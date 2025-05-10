# This file should be placed in db/seeds.rb in your Rails application

# Clear existing data if needed
puts "Clearing existing data..."
Payment.destroy_all
Invoice.destroy_all
CompanyPlan.destroy_all
Plan.destroy_all
Job.destroy_all
CompanyAddress.destroy_all
CompanySocialLink.destroy_all
CompanyReview.destroy_all
Employer.destroy_all
AdminSetting.destroy_all
Admin.destroy_all
Company.destroy_all
Country.destroy_all
UserSetting.destroy_all
User.destroy_all
Account.destroy_all
Skill.destroy_all

puts "Creating skills..."
skills = [
  "ABAP", "Agile", "AI", "Android", "Angular", "AngularJS", "ASP.NET", 
  "Automation Test", "AWS", "Azure", "Big Data", "Blockchain", "Bridge Engineer", 
  "Business Analyst", "Business Intelligence", "C#", "C++", "C language", 
  "Cloud", "COBOL", "Cocos", "Computer Vision", "CSS", "Dart", "Data Analyst", 
  "Database", "Data Science", "Data Warehousing", "Deep Learning", "Designer", 
  "DevOps", "DevSecOps", "Django", "Embedded", "Embedded Android", "Embedded C", 
  "English", "ERP", "Figma", "Flutter", "Games", "GCP", "Golang", "HTML5", 
  "iOS", "IT Support", "J2EE", "Japanese", "Java", "JavaScript", "Jira", 
  "JQuery", "JSON", "Kotlin", "Laravel", "Linux", "Machine Learning", "Magento", 
  "Manager", "MLOps", "MongoDB", "MVC", "MySQL", "NestJS", ".NET", "Networking", 
  "NextJS", "NodeJS", "NoSQL", "Objective C", "Odoo", "OOP", "Oracle", 
  "OutSystems", "PHP", "PostgreSql", "Presale", "Product Designer", 
  "Product Manager", "Product Owner", "Project Manager", "Python", "PyTorch", 
  "QA QC", "ReactJS", "React Native", "Risk Management", "Ruby", "Ruby on Rails", 
  "Rust", "Salesforce", "SAP", "Scala", "Scrum", "Security", "ServiceNow", 
  "Sharepoint", "Shopify", "Software Architect", "Solidity", "Solution Architect", 
  "Spring", "Spring Boot", "SQL", "Swift", "Symfony", "System Admin", 
  "System Engineer", "Team Leader", "TensorFlow", "Tester", "TypeScript", 
  "UI-UX", "Unity", "vb.net", "VueJS", "Wordpress"
]

skill_records = skills.map do |skill_name|
  Skill.create!(skill_name: skill_name)
end

puts "Creating countries..."
countries = [
  "United States", "Japan", "Vietnam", "Singapore", "Germany", 
  "United Kingdom", "Australia", "Canada", "South Korea", "India"
]

country_records = countries.map do |country_name|
  Country.create!(name: country_name)
end

puts "Creating accounts, users, employers, and admins..."

# Admin accounts
admin_accounts = [
  {
    email: "admin1@jobsportal.com",
    password: "123456",
    fullname: "Admin Super User"
  },
  {
    email: "admin2@jobsportal.com",
    password: "123456",
    fullname: "Admin Power User"
  }
]

admin_records = admin_accounts.map.with_index do |admin_data, index|
  account = Account.create!(
    email: admin_data[:email],
    password: admin_data[:password],
    fullname: admin_data[:fullname],
    created_at: Time.now,
    updated_at: Time.now
  )

  Admin.create!(
    role: index == 0 ? 1 : 0, # 1 for super admin, 0 for regular admin
    phonenum: "123456789#{index}",
    account_id: account.id,
    created_at: Time.now,
    updated_at: Time.now
  )
end

# Create admin settings
admin_records.each do |admin|
  AdminSetting.create!(
    admin_id: admin.id,
    data_backup_frequency: [0, 1, 2].sample,
    jobs_posting_approval: [true, false].sample,
    need_approve_job_notification: [true, false].sample,
    need_approve_reviews_notification: [true, false].sample,
    success_payment_notification: true,
    need_approve_job_email: [true, false].sample,
    need_approve_reviews_email: [true, false].sample,
    success_payment_email: true,
    created_at: Time.now,
    updated_at: Time.now
  )
end

puts "Creating companies and company addresses..."
company_types = [0, 1, 2, 3, 4] # Enum values for company types
industries = [0, 1, 2, 3, 4, 5, 6,] # Enum values for industries
company_sizes = [0, 1, 2, 3] # Enum values for company sizes

companies = [
  {
    name: "TechVision Solutions",
    description: "Leading provider of innovative software solutions.",
    website: "https://techvision.example.com"
  },
  {
    name: "Global Software Inc.",
    description: "Enterprise software development company with global reach.",
    website: "https://globalsoftware.example.com"
  },
  {
    name: "DataSmart Analytics",
    description: "Specializing in big data and business intelligence solutions.",
    website: "https://datasmart.example.com"
  },
  {
    name: "WebFront Technologies",
    description: "Frontend and UI/UX focused development company.",
    website: "https://webfront.example.com"
  },
  {
    name: "CloudScale Networks",
    description: "Cloud infrastructure and DevOps services.",
    website: "https://cloudscale.example.com"
  },
  {
    name: "MobileFusion Apps",
    description: "Mobile application development specialists.",
    website: "https://mobilefusion.example.com"
  },
  {
    name: "SecureNet Systems",
    description: "Cybersecurity solutions and consulting.",
    website: "https://securenet.example.com"
  },
  {
    name: "AgileWare Development",
    description: "Agile methodology focused software development.",
    website: "https://agilware.example.com"
  },
  {
    name: "AI Innovations Ltd",
    description: "Artificial intelligence and machine learning solutions.",
    website: "https://aiinnovations.example.com"
  },
  {
    name: "BlockChain Ventures",
    description: "Blockchain technology and cryptocurrency development.",
    website: "https://blockchainventures.example.com"
  },
  {
    name: "ERP Solutions Group",
    description: "Enterprise resource planning implementation specialists.",
    website: "https://erpsolutions.example.com"
  },
  {
    name: "Quantum Software Solutions",
    description: "Quantum computing research and software development.",
    website: "https://quantumsoftware.example.com"
  },
  {
    name: "Digital Marketing Labs",
    description: "Software solutions for digital marketing and analytics.",
    website: "https://digitalmarketinglabs.example.com"
  },
  {
    name: "Healthcare Tech Systems",
    description: "Technology solutions for healthcare providers and patients.",
    website: "https://healthcaretech.example.com"
  },
  {
    name: "FinTech Solutions Inc.",
    description: "Financial technology software and services.",
    website: "https://fintechsolutions.example.com"
  },
  {
    name: "EdTech Innovators",
    description: "Educational technology and e-learning platforms.",
    website: "https://edtechinnovators.example.com"
  },
  {
    name: "GreenTech Software",
    description: "Software solutions for environmental sustainability.",
    website: "https://greentechsoftware.example.com"
  },
  {
    name: "Retail Systems Pro",
    description: "Point-of-sale and inventory management systems for retail.",
    website: "https://retailsystems.example.com"
  },
  {
    name: "Logistics Management Solutions",
    description: "Supply chain and logistics software development.",
    website: "https://logisticsmanagement.example.com"
  },
  {
    name: "Gaming Studio X",
    description: "Game development and interactive entertainment.",
    website: "https://gamingstudiox.example.com"
  }
]

company_records = companies.map do |company_data|
  company = Company.create!(
    name: company_data[:name],
    description: company_data[:description],
    company_type: company_types.sample,
    industry: industries.sample,
    company_size: company_sizes.sample,
    website: company_data[:website],
    country_id: country_records.sample.id,
    created_at: Time.now,
    updated_at: Time.now
  )
  
  # Add 1-3 company addresses for each company
  rand(1..3).times do |i|
    CompanyAddress.create!(
      province: ["California", "New York", "Texas", "Tokyo", "Osaka", "Hanoi", "Ho Chi Minh", "Singapore", "Berlin", "London"].sample,
      full_address: "#{rand(100..999)} #{['Main St', 'Tech Blvd', 'Innovation Ave', 'Digital Rd', 'Code Lane'].sample}, #{['Suite', 'Floor', 'Building'].sample} #{rand(1..30)}",
      company_id: company.id,
      created_at: Time.now,
      updated_at: Time.now
    )
  end

  # Add social links for each company
  link_types = [0, 1, 2, 3] # Enum values for link types
  rand(1..4).times do
    link_type = link_types.sample
    link_types.delete(link_type) # Ensure no duplicate link types
    
    url = case link_type
    when 0 then "https://linkedin.com/company/#{company_data[:name].downcase.gsub(/\s+/, '')}"
    when 1 then "https://twitter.com/#{company_data[:name].downcase.gsub(/\s+/, '')}"
    when 2 then "https://facebook.com/#{company_data[:name].downcase.gsub(/\s+/, '')}"
    when 3 then "https://instagram.com/#{company_data[:name].downcase.gsub(/\s+/, '')}"
    when 4 then "https://github.com/#{company_data[:name].downcase.gsub(/\s+/, '')}"
    end
    
    CompanySocialLink.create!(
      company_id: company.id,
      link_type: link_type,
      url: url,
      created_at: Time.now,
      updated_at: Time.now
    )
  end

  # Add key skills for each company
  rand(3..8).times do
    begin
      company.skills << skill_records.sample
    rescue ActiveRecord::RecordNotUnique
      # Skip if duplicate
    end
  end

  # Add company reviews
  rand(2..5).times do
    CompanyReview.create!(
      company_id: company.id,
      review: ["Great place to work!", "Excellent benefits and work environment.", "Good career growth opportunities.", "Challenging but rewarding work.", "Collaborative team environment."].sample,
      total_rating: rand(3..5),
      recommended: [true, false].sample,
      like: ["Great colleagues", "Flexible work hours", "Good compensation", "Interesting projects", "Learning opportunities"].sample,
      improvement: ["Better work-life balance", "More transparency", "Clearer career paths", "More training opportunities", "Better communication"].sample,
      salary_benefit_rating: rand(3..5),
      culture_environment_rating: rand(3..5),
      office_workspace_rating: rand(3..5),
      opportunities_rating: rand(3..5),
      leader_management_rating: rand(3..5),
      workload_pressure_rating: rand(3..5),
      created_at: Time.now,
      updated_at: Time.now
    )
  end

  company
end

# Create subscription plans
puts "Creating subscription plans..."
plans = [
  {
    name: "Basic",
    short_description: "Essential features for small businesses",
    description: "Access to job posting, basic candidate search, and standard support.",
    price: 99.99,
    duration: 30 # days
  },
  {
    name: "Pro",
    short_description: "Advanced features for growing businesses",
    description: "All Basic features plus advanced candidate search, featured job listings, and priority support.",
    price: 199.99,
    duration: 30
  },
  {
    name: "Enterprise",
    short_description: "Complete solution for large organizations",
    description: "All Pro features plus custom branding, API access, dedicated account manager, and premium analytics.",
    price: 499.99,
    duration: 30
  }
]

plan_records = plans.map do |plan_data|
  Plan.create!(
    name: plan_data[:name],
    short_description: plan_data[:short_description],
    description: plan_data[:description],
    price: plan_data[:price],
    duration: plan_data[:duration],
    created_at: Time.now,
    updated_at: Time.now
  )
end

# Assign subscription plans to companies
puts "Assigning subscription plans to companies..."
company_records.each do |company|
  plan = plan_records.sample
  status = [0, 1, 2].sample # 0: pending, 1: active, 2: cancelled
  start_date = Date.today - rand(1..60).days
  
  company_plan = CompanyPlan.create!(
    company_id: company.id,
    plan_id: plan.id,
    status: status,
    next_billing_date: start_date + plan.duration.days,
    start_date: start_date,
    end_date: start_date + plan.duration.days,
    created_at: Time.now,
    updated_at: Time.now
  )
  
  # Create invoice for this plan
  Invoice.create!(
    company_plan_id: company_plan.id,
    invoice_number: "INV-#{Time.now.year}-#{rand(10000..99999)}",
    issued_date: start_date,
    amout: plan.price,
    due_date: start_date + 15.days,
    created_at: Time.now,
    updated_at: Time.now
  )
end

# Create user accounts
puts "Creating user accounts..."
users = [
  {
    email: "user1@example.com",
    password: "123456",
    fullname: "Alex Johnson"
  },
  {
    email: "user2@example.com",
    password: "123456",
    fullname: "Morgan Lee"
  },
  {
    email: "user3@example.com",
    password: "123456",
    fullname: "Taylor Smith"
  },
  {
    email: "user4@example.com",
    password: "123456",
    fullname: "Jordan Chen"
  },
  {
    email: "user5@example.com",
    password: "123456",
    fullname: "Casey Wong"
  }
]

user_records = users.map.with_index do |user_data, index|
  account = Account.create!(
    email: user_data[:email],
    password: user_data[:password],
    fullname: user_data[:fullname],
    created_at: Time.now,
    updated_at: Time.now
  )

  # Create general settings for the account
  GeneralSetting.create!(
    account_id: account.id,
    format_date: rand(0..2), # Enum for date formats
    currency: rand(0..4), # Enum for currencies
    default_languages: rand(0..2), # Enum for languages
    default_themes: rand(0..1), # Enum for themes
    created_at: Time.now,
    updated_at: Time.now
  )

  user = User.create!(
    account_id: account.id,
    dob: Date.new(1985 + rand(15), rand(1..12), rand(1..28)),
    address: "#{rand(100..999)} #{['Oak St', 'Maple Ave', 'Pine Rd', 'Cedar Ln', 'Elm Blvd'].sample}",
    phonenum: "555#{rand(1000000..9999999)}",
    gender: rand(0..2), # Enum for gender
    headline: ["Full Stack Developer", "UX Designer", "Data Scientist", "DevOps Engineer", "Product Manager"].sample,
    bio: "Experienced professional with a passion for technology and innovation.",
    created_at: Time.now,
    updated_at: Time.now
  )

  # Create user settings
  UserSetting.create!(
    user_id: user.id,
    jobs_notification: [true, false].sample,
    invitation_notification: [true, false].sample,
    upcoming_interview_notification: true,
    upcoming_interview_notification_time: [0, 1, 2].sample,
    resume_visibility: [true, false].sample,
    jobs_email: [true, false].sample,
    invitation_email: [true, false].sample,
    upcoming_interview_email: true,
    upcoming_interview_email_time: [0, 1, 2].sample,
    created_at: Time.now,
    updated_at: Time.now
  )

  # Add skills for each user
  rand(3..10).times do
    level = rand(0..4) # Skill level from 1-5
    begin
      UserSkill.create!(
        user_id: user.id,
        skill_id: skill_records.sample.id,
        level: level,
        created_at: Time.now,
        updated_at: Time.now
      )
    rescue ActiveRecord::RecordNotUnique
      # Skip if duplicate
    end
  end

  # Add education for users
  rand(1..2).times do
    is_studying = rand < 0.2 # 20% chance of still studying
    from_date = Date.today - rand(3..10).years
    to_date = is_studying ? nil : from_date + rand(2..4).years
    
    UserEducation.create!(
      user_id: user.id,
      school: ["Stanford University", "MIT", "Harvard University", "Oxford University", "University of Tokyo", "National University of Singapore", "Technical University of Berlin", "University of Sydney"].sample,
      major: ["Computer Science", "Information Technology", "Software Engineering", "Data Science", "Electrical Engineering", "Business Information Systems"].sample,
      is_studying: is_studying,
      from_date: from_date,
      to_date: to_date,
      additional_details: ["Graduated with honors", "Participated in research projects", "Completed thesis on advanced topics", "Member of student tech club"].sample,
      created_at: Time.now,
      updated_at: Time.now
    )
  end

  # Add experience for users
  rand(1..3).times do
    is_working = rand < 0.3 # 30% chance of currently working
    from_date = Date.today - rand(1..8).years
    to_date = is_working ? nil : from_date + rand(1..3).years
    
    UserExperience.create!(
      user_id: user.id,
      company: companies.sample[:name],
      position: ["Software Engineer", "UI/UX Designer", "Project Manager", "Data Analyst", "Product Owner", "DevOps Engineer", "QA Engineer"].sample,
      is_working: is_working,
      from_date: from_date,
      to_date: to_date,
      additional_details: ["Led team of developers", "Improved system performance by 40%", "Implemented agile methodologies", "Managed client relationships", "Developed new features"].sample,
      created_at: Time.now,
      updated_at: Time.now
    )
  end

  # Add projects for users
  rand(1..3).times do
    is_working = rand < 0.4 # 40% chance of current project
    from_date = Date.today - rand(1..5).years
    to_date = is_working ? nil : from_date + rand(1..2).years
    
    UserProject.create!(
      user_id: user.id,
      project_name: ["E-commerce Platform", "Mobile Banking App", "Healthcare Management System", "Data Analytics Dashboard", "CRM Solution", "Learning Management System"].sample,
      description: "Developed and implemented solutions using modern technologies to solve business problems.",
      is_working: is_working,
      from_date: from_date,
      to_date: to_date,
      url: "https://example.com/projects/#{rand(100..999)}",
      created_at: Time.now,
      updated_at: Time.now
    )
  end

  # Add certificates for users
  rand(1..3).times do
    UserCertificate.create!(
      user_id: user.id,
      certificate_name: ["AWS Certified Developer", "Google Cloud Professional", "Microsoft Certified Azure", "Certified Scrum Master", "PMP", "CISSP", "CompTIA Security+"].sample,
      organization: ["Amazon Web Services", "Google Cloud", "Microsoft", "Scrum Alliance", "PMI", "ISC2", "CompTIA"].sample,
      issue_date: Date.today - rand(1..3).years,
      description: "Professional certification demonstrating expertise in the field.",
      created_at: Time.now,
      updated_at: Time.now
    )
  end

  # Add social links for users
  link_types = [0, 1, 2, 3, 4] # Enum values for link types
  rand(1..4).times do
    link_type = link_types.sample
    link_types.delete(link_type) # Ensure no duplicate link types
    
    url = case link_type
    when 0 then "https://linkedin.com/in/#{user_data[:fullname].downcase.gsub(/\s+/, '')}"
    when 1 then "https://twitter.com/#{user_data[:fullname].downcase.gsub(/\s+/, '')}"
    when 2 then "https://facebook.com/#{user_data[:fullname].downcase.gsub(/\s+/, '')}"
    when 3 then "https://instagram.com/#{user_data[:fullname].downcase.gsub(/\s+/, '')}"
    when 4 then "https://github.com/#{user_data[:fullname].downcase.gsub(/\s+/, '')}"
    end
    
    UserSocialLink.create!(
      user_id: user.id,
      link_type: link_type,
      url: url,
      created_at: Time.now,
      updated_at: Time.now
    )
  end

  user
end

# Create employer accounts
puts "Creating employer accounts..."
employers = [
  {
    email: "employer1@techvision.example.com",
    password: "123456",
    fullname: "Jamie Reynolds"
  },
  {
    email: "employer2@globalsoftware.example.com",
    password: "123456",
    fullname: "Sam Patel"
  },
  {
    email: "employer3@datasmart.example.com",
    password: "123456",
    fullname: "Robin Kim"
  },
  {
    email: "employer4@webfront.example.com",
    password: "123456",
    fullname: "Kelly Martinez"
  },
  {
    email: "employer5@cloudscale.example.com",
    password: "123456",
    fullname: "Pat Nguyen"
  }
]

employer_records = employers.map.with_index do |employer_data, index|
  account = Account.create!(
    email: employer_data[:email],
    password: employer_data[:password],
    fullname: employer_data[:fullname],
    created_at: Time.now,
    updated_at: Time.now
  )

  # Create general settings for the account
  GeneralSetting.create!(
    account_id: account.id,
    format_date: rand(0..3), # Enum for date formats
    currency: rand(0..5), # Enum for currencies
    default_languages: rand(0..2), # Enum for languages
    default_themes: rand(0..1), # Enum for themes
    created_at: Time.now,
    updated_at: Time.now
  )

  employer = Employer.create!(
    account_id: account.id,
    company_id: company_records[index].id, # Assign each employer to a different company initially
    department: ["HR", "Engineering", "Product", "Marketing", "Operations"].sample,
    position: ["HR Manager", "Talent Acquisition Specialist", "CTO", "Engineering Manager", "Product Lead"].sample,
    gender: rand(0..2), # Enum for gender
    phonenum: "555#{rand(1000000..9999999)}",
    created_at: Time.now,
    updated_at: Time.now
  )

  # Create employer settings
  EmployerSetting.create!(
    employer_id: employer.id,
    new_application_notifications: true,
    upcoming_interview_notification: true,
    upcoming_interview_notification_time: [0, 1, 2].sample,
    expired_job_notification: [true, false].sample,
    new_application_email: true,
    upcoming_interview_email: true,
    upcoming_interview_email_time: [0, 1, 2].sample,
    expired_job_email: [true, false].sample,
    created_at: Time.now,
    updated_at: Time.now
  )

  employer
end

# Create jobs
puts "Creating jobs..."
job_types = [0, 1, 2] # Enum for job types (Full-time, Part-time, etc.)
contract_types = [0, 1, 2, 3] # Enum for contract types (Permanent, Temporary, etc.)
experience_levels = [0, 1, 2, 3, 4] # Enum for experience levels (Entry, Junior, etc.)

job_titles = [
  "Senior Software Engineer",
  "Full Stack Developer",
  "DevOps Engineer",
  "Machine Learning Engineer",
  "Data Scientist",
  "UX/UI Designer",
  "Product Manager",
  "Mobile App Developer",
  "Frontend Developer",
  "Backend Developer",
  "Cloud Architect",
  "Database Administrator",
  "QA Engineer",
  "Security Engineer",
  "Business Analyst",
  "Systems Administrator",
  "Network Engineer",
  "IT Support Specialist",
  "Project Manager",
  "Technical Writer"
]

(1..40).each do |i|
  company = company_records.sample
  company_address = company.company_addresses.sample 
  
  job_type = job_types.sample
  contract_type = contract_types.sample
  min_salary = rand(40000..80000)
  max_salary = min_salary + rand(20000..60000)
  
  job = Job.create!(
    title: job_titles.sample,
    description: "We are looking for a talented professional to join our team. This role offers exciting opportunities to work on cutting-edge projects in a collaborative environment.",
    requirements: "• #{rand(3..8)} years of relevant experience\n• Strong knowledge of industry best practices\n• Excellent communication skills\n• Bachelor's degree in Computer Science or related field\n• Experience with agile methodologies",
    benefit: "• Competitive salary and benefits package\n• Flexible working hours\n• Professional development opportunities\n• Health insurance\n• Modern office environment\n• Regular team activities",
    job_type: job_type,
    contract_type: contract_type,
    min_salary: min_salary,
    max_salary: max_salary,
    experience: experience_levels.sample,
    expired_at: Time.now + rand(14..90).days,
    company_id: company.id,
    company_address_id: company.company_addresses.sample.id,
    created_at: Time.now,
    updated_at: Time.now
  )
  
  # Add required skills for the job
  required_skills = skill_records.sample(rand(3..7))
  required_skills.each do |skill|
    begin
      job.skills << skill
    rescue ActiveRecord::RecordNotUnique
      # Skip if duplicate
    end
  end
end

puts "Seed data created successfully!"
