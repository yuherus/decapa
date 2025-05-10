class CreateFavoriteJobs < ActiveRecord::Migration[7.0]
  def change
    create_table :favorite_jobs do |t|
      t.references :user, null: false, foreign_key: true
      t.references :job, null: false, foreign_key: true
      
      t.timestamps
    end
    add_index :favorite_jobs, [:user_id, :job_id], unique: true
  end
end
