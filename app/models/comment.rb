class Comment < ApplicationRecord
  belongs_to :topic, touch: true
  counter_culture :topic
  validates :content, presence: true, length: { maximum: 1000 }
end
