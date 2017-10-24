class Comment < ApplicationRecord
  belongs_to :topic, touch: true
end
