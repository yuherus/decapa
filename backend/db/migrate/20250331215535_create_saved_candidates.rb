class CreateSavedCandidates < ActiveRecord::Migration[7.0]
  def change
    create_table :saved_candidates do |t|
      t.references :employer, null: false, foreign_key: true
      t.references :user, null: false, foreign_key: true

      t.timestamps
    end
    add_index :saved_candidates, [:employer_id, :user_id], unique: true
  end
end
