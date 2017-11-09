class Reply < ApplicationRecord
  belongs_to :comment
  belongs_to :user
  has_many :likes, dependent: :destroy
  
  validates :content, presence: true, length: { maximum: 1000 }
end
