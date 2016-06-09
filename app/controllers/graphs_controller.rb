class GraphsController < ApplicationController

  def line
    @events = Event.where(event_claimer_id: current_user.id)
    @events = @events.order(:start_time)
    data = []

    @events.each do |event|
      data << { "date" => event.start_time.to_date.to_s,
                "points" => event.points.to_i}
    end

    nasty_data = data.group_by {|event| event["date"]}
    out_array = []

    nasty_data.each do |date_array|
      output = {'date' => date_array[0].to_s, "points" => 0 }
      date_array[1].each { |event| output["points"] += event["points"].to_i }
      out_array << output
    end

    render json: {data: out_array}
  end

  def bar
    @events = Event.where(event_claimer_id: current_user.id)
    @events = @events.order(:start_time)

    data = []
    @events.each do |event|
      data << { "date" => event.start_time.strftime('%b %d'),
                "points" => event.points.to_i}
    end
    nasty_data = data.group_by {|event| event["date"]}
    out_array = []

    nasty_data.each do |date_array|
      output = {'date' => date_array[0], "points" => 0 }
      date_array[1].each { |event| output["points"] += event["points"].to_i }
      out_array << output
    end

    if out_array.length > 7
      out_array.shift until out_array.length == 7
    end

    render json: {data: out_array}
  end

  def pie
    data = current_user.house.get_users_and_points
    render json: {data: data}
  end

end
