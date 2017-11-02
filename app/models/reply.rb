class Reply < ApplicationRecord
  belongs_to :comment
  validates :content, presence: true, length: { maximum: 1000 }
end
