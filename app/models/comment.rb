class Comment < ApplicationRecord
  belongs_to :topic, touch: true
  has_many :replies
  counter_culture :topic
  validates :content, presence: true, length: { maximum: 1000 }
end
