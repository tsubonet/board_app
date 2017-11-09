class CommentsController < ApplicationController

  # POST /comments
  # POST /comments.json
  def create
    comment = Comment.new(comment_params)
    if comment.save
      response_data = {
        comment: comment,
        status: 'success',
        txt: ['回答を投稿しました！'],
      }
    else
      response_data = {
        status: 'error',
        txt: comment.errors.full_messages,
      }
    end
    render json: response_data
  end


  # DELETE /comments/1
  # DELETE /comments/1.json
  def destroy
    comment = Comment.find(params[:id])
    if comment.destroy
      response_data = {
        comment: comment,
        status: 'success',
        txt: ['回答を削除しました'],
      }
      render json: response_data
    end
  end


  private

    def comment_params
      params.permit(:user_id, :content, :topic_id)
    end


end
