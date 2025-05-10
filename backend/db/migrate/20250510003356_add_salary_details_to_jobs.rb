class AddSalaryDetailsToJobs < ActiveRecord::Migration[7.1]
  def change
    add_column :jobs, :currency, :string, default: "VND"
    add_column :jobs, :salary_period, :integer, default: 0
    add_column :jobs, :display_salary, :boolean, default: true
  end
end 
