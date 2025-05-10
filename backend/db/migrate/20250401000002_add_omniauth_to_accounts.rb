class AddOmniauthToAccounts < ActiveRecord::Migration[7.1]
  def change
    add_column :accounts, :provider, :string
    add_column :accounts, :uid, :string
    add_column :accounts, :avatar_url, :string
  end
end
