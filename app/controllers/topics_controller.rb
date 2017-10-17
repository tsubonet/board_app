class TopicsController < ApplicationController

  def index
    render_for_react(
      props: {
        topics: Topic.page(params[:page]).per(10)
      },
    )
  end

  def show
    render_for_react(
      props: {
        name: "AAAAAAAAAAA"
      },
    )
  end
end
