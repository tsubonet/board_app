class CreateLikes < ActiveRecord::Migration[5.1]
  def change
    create_table :likes do |t|
      t.references :user#, foreign_key: true
      t.integer :post_id
      t.string :status

      t.timestamps
    end
  end
end
