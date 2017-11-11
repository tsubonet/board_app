class Like < ApplicationRecord
  belongs_to :user
  belongs_to :topic, foreign_key: :post_id
  #counter_culture :topic
end
