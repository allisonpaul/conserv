class SessionsController < ActionController::Base

  def new
    @user = User.new
  end

  # user logs in
  def create
    @user = User.find_by(email: params[:email])
    if @user
      @house = House.find_by(id: @user.house_id)
    end

    if @user && @user.authenticate(params[:password])
      if @house == nil
        session[:user_id] = @user.id
        render json: {  user_id: session[:user_id],
                        house_member: false,
                        currentUserName: @user.username,
                      }
      else
        session[:user_id] = @user.id
        render json: {  user_id: session[:user_id],
                        house_member: true,
                        currentUserName: @user.username,
                      }
      end
    else
      @errors = "Invalid Credentials"
      render json: { errors: @errors}
    end
  end

  def destroy
    session[:user_id] = nil
       p session[:user_id]
    render json: {logout: true}
  end

  private
    def login_params
      params.permit(:email, :password)
    end
end
