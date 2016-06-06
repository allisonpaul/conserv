class HousesController < ApplicationController

  def index
    @user = User.find(current_user.id)
    @house = @user.house
    @house_members = User.where(house_id: @house.id)
    data = []
    @house_members.each do |member|
      data << { "house_name" => @house.name, "user_name" => member.username }
    end
    render json: {data: data}
  end

  def new
    @house = House.new
  end

  def create
    @house = House.find_or_create_by(name: params[:name])
    @user = User.find(current_user.id)
    if @user && @user.house_id == nil
      @user.house_id = @house.id
      @user.save
      render json: { house_name: @house.name}
    else
      @errors = "You can only join one house!"
      render json: { errors: @errors}
    end
  end

  def add_member
    @user = User.find(current_user.id)
    p "!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!"
    p @user
    @new_member = User.find_by(username: params[:name])
    p "!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!"
    p @user
    @house = @user.house
    p "!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!"
    p @user
    # if @new_member && @new_member.

  end

  private
    def house_params
      params.permit(:name)
    end
end
