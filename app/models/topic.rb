class Topic < ApplicationRecord
  default_scope -> { order(updated_at: :desc) }
  validates :gender, presence: true
  validates :title, presence: true
  validates :content, presence: true

end
