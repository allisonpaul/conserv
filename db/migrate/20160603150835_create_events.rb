class CreateEvents < ActiveRecord::Migration
  def change
    create_table :events do |t|
      t.integer :points
      t.integer :user_id
      t.string :range
      t.timestamps(null: false)
    end
  end
end

# might need to change the range to datetime objects
