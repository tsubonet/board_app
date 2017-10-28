class CreateTags < ActiveRecord::Migration[5.1]
  def change
    create_table :tags do |t|
      t.string :name
      t.integer :topic_tags_count, default: 0, null: false

      t.timestamps
    end
  end
end
