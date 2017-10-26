class CommentsController < ApplicationController

  # POST /comments
  # POST /comments.json
  def create
    @comment = Comment.new(comment_params)
    if @comment.save
      response_data = {
        status: 'success',
        txt: ['質問aを投稿しました！']
      }
    else
      response_data = {
        status: 'error',
        txt: @comment.errors.full_messages
      }
    end
    render json: response_data
  end




  private

    def comment_params
      params.permit(:user, :content, :topic_id)
    end


end
