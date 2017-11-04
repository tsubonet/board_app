class Topic < ApplicationRecord
  has_many :topic_tags, dependent: :destroy
  has_many :tags, :through => :topic_tags
  has_many :comments, dependent: :destroy

  default_scope           -> { order(updated_at: :desc) }
  scope :ranking_weekly,  -> { where('created_at > ?', 1.weeks.ago).order(view_count: :desc) }
  scope :ranking_monthly, -> { where('created_at > ?', 1.month.ago).order(view_count: :desc) }
  scope :ranking_all,     -> { order(view_count: :desc) }
  scope :no_comment,      -> { where('comments_count = ?', '0') }

  validates :gender, presence: true
  validates :title, presence: true, length: { maximum: 50 }
  validates :content, presence: true, length: { maximum: 1000 }

end
