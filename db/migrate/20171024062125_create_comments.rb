class CreateComments < ActiveRecord::Migration[5.1]
  def change
    create_table :comments do |t|
      t.string :content
      t.string :user
      t.references :topic, foreign_key: true

      t.timestamps
    end
  end
end
