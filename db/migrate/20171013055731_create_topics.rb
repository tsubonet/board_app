class CreateTopics < ActiveRecord::Migration[5.1]
  def change
    create_table :topics do |t|
      t.string :title
      t.string :content
      t.string :gender
      t.string :user
      t.integer :comments_count, default: 0, null: false

      t.timestamps
    end
  end
end
