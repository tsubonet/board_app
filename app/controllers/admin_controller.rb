class AdminController < ApplicationController

  def index
    render_for_react(
      props: {
        users: User.all
      }
    )
  end

  private
end
