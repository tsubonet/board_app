class Comment < ApplicationRecord
  belongs_to :topic, touch: true
  belongs_to :user
  has_many :replies, dependent: :destroy
  has_many :likes, -> { where(status: 'comment') },class_name: 'Like', foreign_key: :post_id, dependent: :destroy
  counter_culture :topic

  validates :content, presence: true, length: { maximum: 1000 }
end
