class UsersController < ApplicationController

  # DELETE /users/1
  # DELETE /users/1.json
  def destroy
    user = User.find(params[:id])
    if user.destroy
      response_data = {
        status: 'success',
        user: user,
      }
      render json: response_data, status: :ok
    end
  end

  # POST /users/current
  # POST /users/current.json
  def current
    session[:user_id] = params[:user_id]
    response_data = {
      status: 'success',
      currentUser: current_user,
    }
    render json: response_data, status: :ok
  end

  private

    def topic_params
      params.permit(:user_id, :gender, :title, :content, {:tag_ids => []})
    end

end
