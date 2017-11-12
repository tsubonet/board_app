class ApplicationController < ActionController::Base
  protect_from_forgery with: :exception

  before_action :store_location

  private

  def action_path
    "#{controller_path}##{action_name}"
  end

  def current_user
    User.find_by(id: session[:user_id])
  end

  def no_comments_count
    Topic.no_comments.count
  end

  def tags
    Tag.all
  end

  def ranking_topics
    #Topic.ranking_weekly.includes(:user).limit(5)
    ranking_hash = Impression.where("created_at >= ?", 1.hours.ago).group(:impressionable_id).order('count_all desc').limit(5).count
    ids = ranking_hash.keys
    ranking_topics = Topic.includes(:user).where(:id => ids)
    ranking_topics = ids.map {|id| ranking_topics.detect {|topic| topic.id == id } }
    ranking_topics = ranking_topics.map.with_index do |topic, index|
      topic.impressions_count = ranking_hash[ids[index]]
      topic
    end
  end

  def store_location
    if request.get? && request.url.match(/\/auth\//).nil? && current_user.nil?
      session[:forwarding_url] = request.url
    end
  end

  def common_props
    {
      actionPath: action_path,
      currentUser: current_user,
      noCommentsCount: no_comments_count,
      rankingTopics: ranking_topics,
      tags: tags,
    }
  end

  def render_for_react(props: {}, status: 200)

    if request.format.json?
      response.headers["Cache-Control"] = "no-cache, no-store"
      response.headers["Expires"] = "Fri, 01 Jan 1990 00:00:00 GMT"
      response.headers["Pragma"] = "no-cache"
      render(
        json: common_props.merge(props),
        status: status,
      )
    else
      render(
        html: view_context.react_component(
          "Router",
          prerender: true,
          props: common_props.merge(props).as_json,
        ),
        layout: true,
        status: status,
      )
    end
  end

end
