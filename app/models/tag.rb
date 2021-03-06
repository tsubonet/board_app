class Tag < ApplicationRecord
  has_many :topic_tags, dependent: :destroy
  has_many :topics, :through => :topic_tags
end
