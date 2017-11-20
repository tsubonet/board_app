class UsersController < ApplicationController

  # POST /users
  # POST /users.json
  def create
    user = User.new(user_params)
    user.uid = 111111111 if user.uid.empty?
    user.name = ((0..9).to_a + ("a".."z").to_a + ("A".."Z").to_a).sample(8).join if user.name.empty?
    if user.save
      response_data = {
        user: user,
        status: 'success',
      }
    else
      response_data = {
        status: 'error',
        txt: user.errors.full_messages,
      }
    end
    render json: response_data
  end


  # DELETE /users/1
  # DELETE /users/1.json
  def destroy
    user = User.find(params[:id])
    if user.destroy
      response_data = {
        status: 'success',
        user: user,
      }
    else
      response_data = {
        status: 'error',
      }
    end
    render json: response_data, status: :ok
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

    def user_params
      params.permit(:uid, :name)
    end

end
