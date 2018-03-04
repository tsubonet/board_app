class ChangeDatatypeContentOfReplies < ActiveRecord::Migration[5.1]
  def change
    change_column :replies, :content, :text
  end
end
