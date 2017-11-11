class Topic < ApplicationRecord
  has_many :topic_tags, dependent: :destroy
  has_many :tags, :through => :topic_tags
  has_many :comments, dependent: :destroy
  belongs_to :user
  has_many :likes, -> { where(status: 'topic') }, foreign_key: :post_id, dependent: :destroy

  default_scope           -> { order(updated_at: :desc) }
  scope :ranking_weekly,  -> { unscoped.where('created_at > ?', 1.weeks.ago).order(views_count: :desc) }
  scope :ranking_monthly, -> { unscoped.where('created_at > ?', 1.month.ago).order(views_count: :desc) }
  scope :ranking_all,     -> { unscoped.order(views_count: :desc) }
  scope :no_comment,      -> { where('comments_count = ?', '0') }

  validates :gender, presence: true
  validates :title, presence: true, length: { maximum: 50 }
  validates :content, presence: true, length: { maximum: 1000 }

end
