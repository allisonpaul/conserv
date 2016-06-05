class HousesController < ApplicationController

  def index
    @house = House.find()
  end

  def new
    @house = House.new
  end

  def create
    @house = House.find_or_create_by(name: params[:name])
    @user = User.find(current_user.id)
    if @user.house_id == nil
      @house.save
      @user.house_id = @house.id
      @user.save
      render json: { house_name: @house.name}
    else
      @errors = "You can only join one house!"
      render json: { errors: @errors}
    end
  end


  private
    def house_params
      params.permit(:name)
    end
end
