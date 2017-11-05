class RepliesController < ApplicationController

  # POST /replies
  # POST /replies.json
  def create
    reply = Reply.new(reply_params)
    if reply.save
      response_data = {
        reply: reply,
        status: 'success',
        txt: ['回答を投稿しました！'],
      }
    else
      response_data = {
        status: 'error',
        txt: reply.errors.full_messages,
      }
    end
    render json: response_data
  end

  private

    def reply_params
      params.permit(:user_id, :content, :comment_id)
    end


end
