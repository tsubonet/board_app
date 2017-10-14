class TopicsController < ApplicationController

  def index
    render_for_react(
      props: {
        topics: Topic.all
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
