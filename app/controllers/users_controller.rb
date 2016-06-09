class UsersController < ApplicationController

  def new
    @user = User.new
  end

  # register a new user
  def create
    @user = User.new(user_params)
    if @user.save
      session[:user_id] = @user.id
      render json: {  user_id: session[:user_id],
                      currentUserName: @user.username
                   }
    else
      @errors = @user.errors.full_messages
      render json: { errors: @errors }
    end
  end

  def show
    @user = User.find(current_user.id)
    render json: {  email: @user.email,
                    username: @user.username,
                    events: @user.events,
                    averagePoints: @user.average_points
                  }
  end

  private
    def user_params
      params.require(:user).permit(:email, :username, :password)
    end
end
