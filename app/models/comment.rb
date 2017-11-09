class Comment < ApplicationRecord
  belongs_to :topic, touch: true
  belongs_to :user
  has_many :replies, dependent: :destroy
  counter_culture :topic
  has_many :likes, dependent: :destroy
  validates :content, presence: true, length: { maximum: 1000 }
end
