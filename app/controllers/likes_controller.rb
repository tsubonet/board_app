class LikesController < ApplicationController

  def create
    like = Like.new(like_params)
    if like.save
      response_data = {
        like: like,
      }
    end
    render json: response_data
  end

  def destroy
    like = Like.find(params[:id])
    if like.destroy
      response_data = {
        like: like,
      }
      render json: response_data
    end
  end

  private
    def like_params
      params.permit(:post_id, :user_id, :status)
    end
end
