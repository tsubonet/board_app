class CreateTopicTags < ActiveRecord::Migration[5.1]
  def change
    create_table :topic_tags do |t|
      t.references :topic, foreign_key: true
      t.references :tag, foreign_key: true

      t.timestamps
    end
  end
end
