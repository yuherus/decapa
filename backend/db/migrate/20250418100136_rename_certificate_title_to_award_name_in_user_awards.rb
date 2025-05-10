class RenameCertificateTitleToAwardNameInUserAwards < ActiveRecord::Migration[7.1]
  def change
    rename_column :user_awards, :certificate_title, :award_name
  end
end
