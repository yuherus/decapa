class CreateTokenBlacklists < ActiveRecord::Migration[7.1]
  def change
    create_table :token_blacklists do |t|
      t.string :token, null: false, index: { unique: true }
      t.datetime :expires_at, null: false

      t.timestamps
    end
    
    add_index :token_blacklists, :expires_at
  end
end 
