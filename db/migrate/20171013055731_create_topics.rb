class CreateTopics < ActiveRecord::Migration[5.1]
  def change
    create_table :topics do |t|
      t.string :title
      t.string :content
      t.string :gender
      t.string :user
      t.integer :comments_count, default: 0, null: false
      t.integer :impressions_count, default: 0, null: false
      t.references :user#, foreign_key: true

      t.timestamps
    end
  end
end
