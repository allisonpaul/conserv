class SessionsController < ActionController::Base

  def new
    @user = User.new
  end

  def create
    @user = User.find_by(email: params[:email])
    if @user && @user.authenticate(params[:password])
      puts "session info--------------"
      session[:user_id] = @user.id
      p session
      render json: { user_id: session[:user_id] }
    else
      @errors = "Invalid Credentials"
      render json: { errors: @errors}
    end
  end

  private
    def login_params
      params.permit(:email, :password)
    end
end
