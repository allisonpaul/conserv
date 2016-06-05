class HousesController < ApplicationController

  def index
    @house = House.find()
  end

  def new
    @house = House.new
  end

  def create
    @hosue = House.new
    if @house.save

  end


  private
    def house_params
      params.permit(:name)
    end
end
