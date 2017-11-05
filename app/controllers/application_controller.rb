class ApplicationController < ActionController::Base
  protect_from_forgery with: :exception

  private

  def action_path
    "#{controller_path}##{action_name}"
  end

  def current_user
    session[:user_id]
  end

  def no_comments_count
    Topic.no_comment.count
  end

  def tags
    Tag.all
  end

  def ranking_topics
    Topic.unscoped.ranking_weekly.limit(5)
  end

  def common_props
    {
      actionPath: action_path,
      noCommentsCount: no_comments_count,
      tags: tags,
      rankingTopics: ranking_topics,
      currentUser: current_user,
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
