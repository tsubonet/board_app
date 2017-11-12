module RankingTopics

  extend ActiveSupport::Concern

  included do
    # ここにcallback等
  end

  def module_ranking_weekly
    ranking_hash = Impression.where("created_at >= ?", 1.weeks.ago).group(:impressionable_id).order('count_all desc').limit(5).count
    ranking_topics(ranking_hash)
  end

  def module_ranking_monthly
    ranking_hash = Impression.where("created_at >= ?", 1.months.ago).group(:impressionable_id).order('count_all desc').limit(5).count
    ranking_topics(ranking_hash)
  end

  def module_ranking_all
    ranking_topics = Topic.ranking_all.includes(:user).limit(5)
  end

  private

    def ranking_topics(obj)
      ids = obj.keys
      topics = Topic.includes(:user).where(:id => ids)
      topics = ids.map {|id| topics.detect {|topic| topic.id == id } }
      topics = topics.map.with_index do |topic, index|
        topic.impressions_count = obj[ids[index]]
        topic
      end
    end

end
