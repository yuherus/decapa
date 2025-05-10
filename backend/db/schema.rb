# This file is auto-generated from the current state of the database. Instead
# of editing this file, please use the migrations feature of Active Record to
# incrementally modify your database, and then regenerate this schema definition.
#
# This file is the source Rails uses to define your schema when running `bin/rails
# db:schema:load`. When creating a new database, `bin/rails db:schema:load` tends to
# be faster and is potentially less error prone than running all of your
# migrations from scratch. Old migrations may fail to apply correctly if those
# migrations use external dependencies or application code.
#
# It's strongly recommended that you check this file into your version control system.

ActiveRecord::Schema[7.1].define(version: 2025_05_10_003356) do
  create_table "accounts", charset: "utf8mb4", collation: "utf8mb4_0900_ai_ci", force: :cascade do |t|
    t.string "email", default: "", null: false
    t.string "encrypted_password", default: "", null: false
    t.string "fullname"
    t.string "reset_password_token"
    t.datetime "reset_password_sent_at"
    t.datetime "remember_created_at"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.string "provider"
    t.string "uid"
    t.string "avatar_url"
    t.index ["email"], name: "index_accounts_on_email", unique: true
    t.index ["reset_password_token"], name: "index_accounts_on_reset_password_token", unique: true
  end

  create_table "active_storage_attachments", charset: "utf8mb4", collation: "utf8mb4_0900_ai_ci", force: :cascade do |t|
    t.string "name", null: false
    t.string "record_type", null: false
    t.bigint "record_id", null: false
    t.bigint "blob_id", null: false
    t.datetime "created_at", null: false
    t.index ["blob_id"], name: "index_active_storage_attachments_on_blob_id"
    t.index ["record_type", "record_id", "name", "blob_id"], name: "index_active_storage_attachments_uniqueness", unique: true
  end

  create_table "active_storage_blobs", charset: "utf8mb4", collation: "utf8mb4_0900_ai_ci", force: :cascade do |t|
    t.string "key", null: false
    t.string "filename", null: false
    t.string "content_type"
    t.text "metadata"
    t.string "service_name", null: false
    t.bigint "byte_size", null: false
    t.string "checksum"
    t.datetime "created_at", null: false
    t.index ["key"], name: "index_active_storage_blobs_on_key", unique: true
  end

  create_table "active_storage_variant_records", charset: "utf8mb4", collation: "utf8mb4_0900_ai_ci", force: :cascade do |t|
    t.bigint "blob_id", null: false
    t.string "variation_digest", null: false
    t.index ["blob_id", "variation_digest"], name: "index_active_storage_variant_records_uniqueness", unique: true
  end

  create_table "admin_settings", charset: "utf8mb4", collation: "utf8mb4_0900_ai_ci", force: :cascade do |t|
    t.bigint "admin_id", null: false
    t.integer "data_backup_frequency"
    t.boolean "jobs_posting_approval"
    t.boolean "need_approve_job_notification"
    t.boolean "need_approve_reviews_notification"
    t.boolean "success_payment_notification"
    t.boolean "need_approve_job_email"
    t.boolean "need_approve_reviews_email"
    t.boolean "success_payment_email"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["admin_id"], name: "index_admin_settings_on_admin_id"
  end

  create_table "admins", charset: "utf8mb4", collation: "utf8mb4_0900_ai_ci", force: :cascade do |t|
    t.integer "role"
    t.string "phonenum"
    t.bigint "account_id", null: false
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["account_id"], name: "index_admins_on_account_id"
  end

  create_table "applications", charset: "utf8mb4", collation: "utf8mb4_0900_ai_ci", force: :cascade do |t|
    t.bigint "user_id", null: false
    t.bigint "job_id", null: false
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.string "full_name"
    t.string "email"
    t.string "phone"
    t.text "cover_letter"
    t.integer "status"
    t.bigint "user_cv_id"
    t.index ["job_id"], name: "index_applications_on_job_id"
    t.index ["user_cv_id"], name: "index_applications_on_user_cv_id"
    t.index ["user_id"], name: "index_applications_on_user_id"
  end

  create_table "companies", charset: "utf8mb4", collation: "utf8mb4_0900_ai_ci", force: :cascade do |t|
    t.string "name"
    t.text "description"
    t.integer "company_type"
    t.integer "industry"
    t.integer "company_size"
    t.string "website"
    t.bigint "country_id", null: false
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.integer "status", default: 0
    t.index ["country_id"], name: "index_companies_on_country_id"
    t.index ["status"], name: "index_companies_on_status"
  end

  create_table "company_addresses", charset: "utf8mb4", collation: "utf8mb4_0900_ai_ci", force: :cascade do |t|
    t.string "province"
    t.string "full_address"
    t.bigint "company_id", null: false
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["company_id"], name: "index_company_addresses_on_company_id"
  end

  create_table "company_key_skills", charset: "utf8mb4", collation: "utf8mb4_0900_ai_ci", force: :cascade do |t|
    t.bigint "company_id", null: false
    t.bigint "skill_id", null: false
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["company_id", "skill_id"], name: "index_company_key_skills_on_company_id_and_skill_id", unique: true
    t.index ["company_id"], name: "index_company_key_skills_on_company_id"
    t.index ["skill_id"], name: "index_company_key_skills_on_skill_id"
  end

  create_table "company_plans", charset: "utf8mb4", collation: "utf8mb4_0900_ai_ci", force: :cascade do |t|
    t.bigint "company_id", null: false
    t.bigint "plan_id", null: false
    t.integer "status"
    t.date "next_billing_date"
    t.date "start_date"
    t.date "end_date"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["company_id"], name: "index_company_plans_on_company_id"
    t.index ["plan_id"], name: "index_company_plans_on_plan_id"
  end

  create_table "company_reviews", charset: "utf8mb4", collation: "utf8mb4_0900_ai_ci", force: :cascade do |t|
    t.text "review"
    t.integer "total_rating"
    t.boolean "recommended"
    t.text "like"
    t.text "improvement"
    t.integer "salary_benefit_rating"
    t.integer "culture_environment_rating"
    t.integer "office_workspace_rating"
    t.integer "opportunities_rating"
    t.integer "leader_management_rating"
    t.integer "workload_pressure_rating"
    t.bigint "company_id", null: false
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["company_id"], name: "index_company_reviews_on_company_id"
  end

  create_table "company_social_links", charset: "utf8mb4", collation: "utf8mb4_0900_ai_ci", force: :cascade do |t|
    t.bigint "company_id", null: false
    t.integer "link_type"
    t.string "url"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["company_id"], name: "index_company_social_links_on_company_id"
  end

  create_table "countries", charset: "utf8mb4", collation: "utf8mb4_0900_ai_ci", force: :cascade do |t|
    t.string "name"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
  end

  create_table "email_subscriptions", charset: "utf8mb4", collation: "utf8mb4_0900_ai_ci", force: :cascade do |t|
    t.bigint "user_id", null: false
    t.bigint "skill_id", null: false
    t.string "location"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["skill_id"], name: "index_email_subscriptions_on_skill_id"
    t.index ["user_id"], name: "index_email_subscriptions_on_user_id"
  end

  create_table "employer_settings", charset: "utf8mb4", collation: "utf8mb4_0900_ai_ci", force: :cascade do |t|
    t.bigint "employer_id", null: false
    t.boolean "new_application_notifications"
    t.boolean "upcoming_interview_notification"
    t.integer "upcoming_interview_notification_time"
    t.boolean "expired_job_notification"
    t.boolean "new_application_email"
    t.boolean "upcoming_interview_email"
    t.integer "upcoming_interview_email_time"
    t.boolean "expired_job_email"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["employer_id"], name: "index_employer_settings_on_employer_id"
  end

  create_table "employers", charset: "utf8mb4", collation: "utf8mb4_0900_ai_ci", force: :cascade do |t|
    t.string "department"
    t.string "position"
    t.integer "gender"
    t.string "phonenum"
    t.bigint "account_id", null: false
    t.bigint "company_id", null: false
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["account_id"], name: "index_employers_on_account_id"
    t.index ["company_id"], name: "index_employers_on_company_id"
  end

  create_table "favorite_jobs", charset: "utf8mb4", collation: "utf8mb4_0900_ai_ci", force: :cascade do |t|
    t.bigint "user_id", null: false
    t.bigint "job_id", null: false
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["job_id"], name: "index_favorite_jobs_on_job_id"
    t.index ["user_id", "job_id"], name: "index_favorite_jobs_on_user_id_and_job_id", unique: true
    t.index ["user_id"], name: "index_favorite_jobs_on_user_id"
  end

  create_table "general_settings", charset: "utf8mb4", collation: "utf8mb4_0900_ai_ci", force: :cascade do |t|
    t.integer "format_date"
    t.integer "currency"
    t.integer "default_languages"
    t.integer "default_themes"
    t.bigint "account_id", null: false
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["account_id"], name: "index_general_settings_on_account_id"
  end

  create_table "interviewers", charset: "utf8mb4", collation: "utf8mb4_0900_ai_ci", force: :cascade do |t|
    t.bigint "interview_id", null: false
    t.bigint "employer_id", null: false
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["employer_id"], name: "index_interviewers_on_employer_id"
    t.index ["interview_id", "employer_id"], name: "index_interviewers_on_interview_id_and_employer_id", unique: true
    t.index ["interview_id"], name: "index_interviewers_on_interview_id"
  end

  create_table "interviews", charset: "utf8mb4", collation: "utf8mb4_0900_ai_ci", force: :cascade do |t|
    t.bigint "application_id", null: false
    t.integer "stage_number"
    t.integer "stage_type"
    t.datetime "interview_time"
    t.integer "interview_type"
    t.string "interview_location"
    t.text "note"
    t.text "feedback"
    t.integer "rating"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["application_id"], name: "index_interviews_on_application_id"
  end

  create_table "invoices", charset: "utf8mb4", collation: "utf8mb4_0900_ai_ci", force: :cascade do |t|
    t.bigint "company_plan_id", null: false
    t.string "invoice_number"
    t.date "issued_date"
    t.decimal "amout", precision: 10
    t.date "due_date"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["company_plan_id"], name: "index_invoices_on_company_plan_id"
  end

  create_table "job_requirement_skills", charset: "utf8mb4", collation: "utf8mb4_0900_ai_ci", force: :cascade do |t|
    t.bigint "job_id", null: false
    t.bigint "skill_id", null: false
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["job_id", "skill_id"], name: "index_job_requirement_skills_on_job_id_and_skill_id", unique: true
    t.index ["job_id"], name: "index_job_requirement_skills_on_job_id"
    t.index ["skill_id"], name: "index_job_requirement_skills_on_skill_id"
  end

  create_table "jobs", charset: "utf8mb4", collation: "utf8mb4_0900_ai_ci", force: :cascade do |t|
    t.string "title"
    t.text "description"
    t.text "requirements"
    t.text "benefit"
    t.integer "job_type"
    t.integer "contract_type"
    t.decimal "min_salary", precision: 10
    t.decimal "max_salary", precision: 10
    t.integer "experience"
    t.datetime "expired_at"
    t.bigint "company_id", null: false
    t.bigint "company_address_id", null: false
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.integer "status", default: 0
    t.string "currency", default: "VND"
    t.integer "salary_period", default: 0
    t.boolean "display_salary", default: true
    t.index ["company_address_id"], name: "index_jobs_on_company_address_id"
    t.index ["company_id"], name: "index_jobs_on_company_id"
  end

  create_table "jwt_denylist", charset: "utf8mb4", collation: "utf8mb4_0900_ai_ci", force: :cascade do |t|
    t.string "jti", null: false
    t.datetime "exp", null: false
    t.index ["jti"], name: "index_jwt_denylist_on_jti"
  end

  create_table "notifications", charset: "utf8mb4", collation: "utf8mb4_0900_ai_ci", force: :cascade do |t|
    t.bigint "account_id", null: false
    t.string "title"
    t.text "content"
    t.boolean "is_read"
    t.string "url"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["account_id"], name: "index_notifications_on_account_id"
  end

  create_table "payments", charset: "utf8mb4", collation: "utf8mb4_0900_ai_ci", force: :cascade do |t|
    t.integer "payment_method"
    t.integer "status"
    t.date "paid_at"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.bigint "invoice_id", null: false
    t.index ["invoice_id"], name: "index_payments_on_invoice_id"
  end

  create_table "plans", charset: "utf8mb4", collation: "utf8mb4_0900_ai_ci", force: :cascade do |t|
    t.string "name"
    t.string "short_description"
    t.text "description"
    t.decimal "price", precision: 10
    t.integer "duration"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
  end

  create_table "saved_candidates", charset: "utf8mb4", collation: "utf8mb4_0900_ai_ci", force: :cascade do |t|
    t.bigint "employer_id", null: false
    t.bigint "user_id", null: false
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["employer_id", "user_id"], name: "index_saved_candidates_on_employer_id_and_user_id", unique: true
    t.index ["employer_id"], name: "index_saved_candidates_on_employer_id"
    t.index ["user_id"], name: "index_saved_candidates_on_user_id"
  end

  create_table "skills", charset: "utf8mb4", collation: "utf8mb4_0900_ai_ci", force: :cascade do |t|
    t.string "skill_name"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
  end

  create_table "token_blacklists", charset: "utf8mb4", collation: "utf8mb4_0900_ai_ci", force: :cascade do |t|
    t.string "token", null: false
    t.datetime "expires_at", null: false
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["expires_at"], name: "index_token_blacklists_on_expires_at"
    t.index ["token"], name: "index_token_blacklists_on_token", unique: true
  end

  create_table "user_awards", charset: "utf8mb4", collation: "utf8mb4_0900_ai_ci", force: :cascade do |t|
    t.bigint "user_id", null: false
    t.string "award_name"
    t.string "organization"
    t.date "issue_date"
    t.text "description"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["user_id"], name: "index_user_awards_on_user_id"
  end

  create_table "user_certificates", charset: "utf8mb4", collation: "utf8mb4_0900_ai_ci", force: :cascade do |t|
    t.bigint "user_id", null: false
    t.string "certificate_name"
    t.string "organization"
    t.date "issue_date"
    t.text "description"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["user_id"], name: "index_user_certificates_on_user_id"
  end

  create_table "user_cvs", charset: "utf8mb4", collation: "utf8mb4_0900_ai_ci", force: :cascade do |t|
    t.bigint "user_id", null: false
    t.string "name", null: false
    t.boolean "is_default", default: false
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["user_id"], name: "index_user_cvs_on_user_id"
  end

  create_table "user_educations", charset: "utf8mb4", collation: "utf8mb4_0900_ai_ci", force: :cascade do |t|
    t.bigint "user_id", null: false
    t.string "school"
    t.string "major"
    t.boolean "is_studying"
    t.date "from_date"
    t.date "to_date"
    t.text "additional_details"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["user_id"], name: "index_user_educations_on_user_id"
  end

  create_table "user_experiences", charset: "utf8mb4", collation: "utf8mb4_0900_ai_ci", force: :cascade do |t|
    t.bigint "user_id", null: false
    t.string "company"
    t.string "position"
    t.boolean "is_working"
    t.date "from_date"
    t.date "to_date"
    t.text "additional_details"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["user_id"], name: "index_user_experiences_on_user_id"
  end

  create_table "user_follow_companies", charset: "utf8mb4", collation: "utf8mb4_0900_ai_ci", force: :cascade do |t|
    t.bigint "user_id", null: false
    t.bigint "company_id", null: false
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["company_id"], name: "index_user_follow_companies_on_company_id"
    t.index ["user_id", "company_id"], name: "index_user_follow_companies_on_user_id_and_company_id", unique: true
    t.index ["user_id"], name: "index_user_follow_companies_on_user_id"
  end

  create_table "user_projects", charset: "utf8mb4", collation: "utf8mb4_0900_ai_ci", force: :cascade do |t|
    t.bigint "user_id", null: false
    t.string "project_name"
    t.text "description"
    t.boolean "is_working"
    t.date "from_date"
    t.date "to_date"
    t.string "url"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["user_id"], name: "index_user_projects_on_user_id"
  end

  create_table "user_settings", charset: "utf8mb4", collation: "utf8mb4_0900_ai_ci", force: :cascade do |t|
    t.bigint "user_id", null: false
    t.boolean "jobs_notification"
    t.boolean "invitation_notification"
    t.boolean "upcoming_interview_notification"
    t.integer "upcoming_interview_notification_time"
    t.boolean "resume_visibility"
    t.boolean "jobs_email"
    t.boolean "invitation_email"
    t.boolean "upcoming_interview_email"
    t.integer "upcoming_interview_email_time"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["user_id"], name: "index_user_settings_on_user_id"
  end

  create_table "user_skills", charset: "utf8mb4", collation: "utf8mb4_0900_ai_ci", force: :cascade do |t|
    t.bigint "user_id", null: false
    t.bigint "skill_id", null: false
    t.integer "level"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["skill_id"], name: "index_user_skills_on_skill_id"
    t.index ["user_id"], name: "index_user_skills_on_user_id"
  end

  create_table "user_social_links", charset: "utf8mb4", collation: "utf8mb4_0900_ai_ci", force: :cascade do |t|
    t.bigint "user_id", null: false
    t.integer "link_type"
    t.string "url"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["user_id"], name: "index_user_social_links_on_user_id"
  end

  create_table "users", charset: "utf8mb4", collation: "utf8mb4_0900_ai_ci", force: :cascade do |t|
    t.date "dob"
    t.string "address"
    t.string "phonenum"
    t.integer "gender"
    t.string "headline"
    t.text "bio"
    t.bigint "account_id", null: false
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["account_id"], name: "index_users_on_account_id"
  end

  add_foreign_key "active_storage_attachments", "active_storage_blobs", column: "blob_id"
  add_foreign_key "active_storage_variant_records", "active_storage_blobs", column: "blob_id"
  add_foreign_key "admin_settings", "admins"
  add_foreign_key "admins", "accounts"
  add_foreign_key "applications", "jobs"
  add_foreign_key "applications", "user_cvs"
  add_foreign_key "applications", "users"
  add_foreign_key "companies", "countries"
  add_foreign_key "company_addresses", "companies"
  add_foreign_key "company_key_skills", "companies"
  add_foreign_key "company_key_skills", "skills"
  add_foreign_key "company_plans", "companies"
  add_foreign_key "company_plans", "plans"
  add_foreign_key "company_reviews", "companies"
  add_foreign_key "company_social_links", "companies"
  add_foreign_key "email_subscriptions", "skills"
  add_foreign_key "email_subscriptions", "users"
  add_foreign_key "employer_settings", "employers"
  add_foreign_key "employers", "accounts"
  add_foreign_key "employers", "companies"
  add_foreign_key "favorite_jobs", "jobs"
  add_foreign_key "favorite_jobs", "users"
  add_foreign_key "general_settings", "accounts"
  add_foreign_key "interviewers", "employers"
  add_foreign_key "interviewers", "interviews"
  add_foreign_key "interviews", "applications"
  add_foreign_key "invoices", "company_plans"
  add_foreign_key "job_requirement_skills", "jobs"
  add_foreign_key "job_requirement_skills", "skills"
  add_foreign_key "jobs", "companies"
  add_foreign_key "jobs", "company_addresses"
  add_foreign_key "notifications", "accounts"
  add_foreign_key "payments", "invoices"
  add_foreign_key "saved_candidates", "employers"
  add_foreign_key "saved_candidates", "users"
  add_foreign_key "user_awards", "users"
  add_foreign_key "user_certificates", "users"
  add_foreign_key "user_cvs", "users"
  add_foreign_key "user_educations", "users"
  add_foreign_key "user_experiences", "users"
  add_foreign_key "user_follow_companies", "companies"
  add_foreign_key "user_follow_companies", "users"
  add_foreign_key "user_projects", "users"
  add_foreign_key "user_settings", "users"
  add_foreign_key "user_skills", "skills"
  add_foreign_key "user_skills", "users"
  add_foreign_key "user_social_links", "users"
  add_foreign_key "users", "accounts"
end
