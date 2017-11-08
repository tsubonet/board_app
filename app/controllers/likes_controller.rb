class LikesController < ApplicationController

  def create
    like = Like.new(like_params)
    like.save
  end

  private
    def like_params
      params.permit(:topic_id, :user_id)
    end
end
