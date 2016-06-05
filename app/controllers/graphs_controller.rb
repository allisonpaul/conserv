class GraphsController < ApplicationController

  def line
    @events = Event.where(event_claimer_id: current_user.id)
    p @events
    data = []
    @events.each do |event|
      data << {"date" => event.start_time.to_date.to_s, "points" => event.points}
    end
    p data
    render json: {data: data}
  end

  def bar
    html = render_to_string 'bar_graph'
    render json: {html: html}
  end

  def pie
    html = render_to_string 'pie_graph'
    render json: {html: html}
  end

end
