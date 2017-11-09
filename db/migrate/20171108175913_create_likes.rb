class CreateLikes < ActiveRecord::Migration[5.1]
  def change
    create_table :likes do |t|
      t.integer :topic_id
      t.integer :comment_id
      t.integer :reply_id
      t.integer :user_id

      t.timestamps
    end
  end
end
