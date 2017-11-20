class AdminController < ApplicationController

  before_action :authenticate_user

  def index
    render_for_react(
      props: {
        users: User.all
      }
    )
  end

  private

   def authenticate_user
      if current_user.nil? || (!current_user.nil? && current_user.uid != '138662959')
        redirect_to root_url
      end
   end
end
