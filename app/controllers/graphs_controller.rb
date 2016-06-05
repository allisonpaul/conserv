class GraphsController < ApplicationController

  def line
    @events = Event.where(event_claimer_id: current_user.id)
    @events = @events.order(:start_time)
    data = []
    @events.each do |event|
      data << {"date" => event.start_time.to_date.to_s, "points" => event.points.to_i}
    end
    p data
    render json: {data: data}
  end

  def bar
    html = render_to_string 'bar_graph'
    render json: {html: html}
  end

  def pie
    data = current_user.house.get_users_and_points
    render json: {data: data}
  end

end
