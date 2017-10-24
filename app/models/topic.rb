class Topic < ApplicationRecord
  has_many :topic_tags, dependent: :destroy
  has_many :tags, :through => :topic_tags
  has_many :comments

  default_scope -> { order(updated_at: :desc) }
  validates :gender, presence: true
  validates :title, presence: true, length: { maximum: 50 }
  validates :content, presence: true, length: { maximum: 1000 }

end
