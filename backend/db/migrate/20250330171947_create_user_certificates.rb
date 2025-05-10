class CreateUserCertificates < ActiveRecord::Migration[7.1]
  def change
    create_table :user_certificates do |t|
      t.references :user, null: false, foreign_key: true
      t.string :certificate_name
      t.string :organization
      t.date :issue_date
      t.text :description

      t.timestamps
    end
  end
end
