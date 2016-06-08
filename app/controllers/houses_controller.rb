class HousesController < ApplicationController

  def index
    @user = User.find(current_user.id)
    @house = @user.house
    @house_members = User.where(house_id: @house.id)
    data = []
    @house_members.each do |member|
      data << { "house_name" => @house.name, "user_name" => member.username, "email" => member.email, "events" => @user.events }
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
    @new_member = User.find_by(username: params[:name])
    @house = @user.house
    if @new_member && @new_member.house_id == nil
      @new_member.house_id = @house.id
      @new_member.save
      @success = "#{@new_member.username} has been successfully added!"
      render json: { success: @success }
    else
      @errors = "User does not exit or already part of a house!"
      render json: { errors: @errors}
    end
  end

  def join_house
    @house = House.find(params[:id])
    current_user.house_id = @house.id
    current_user.save
    render json: { user: current_user }
  end

  private
    def house_params
      params.permit(:name, :id)
    end
end
