class EventsController < ApplicationController
  def index
    all_events = Event.where(device_id: current_user.device_id)
    unclaimed_events = []

    all_events.each do |event|
      if event.event_claimer_id == nil
        unclaimed_events << { event_date: event.start_time.strftime('%a, %b %d'),
                              event_time: event.start_time.strftime('%I:%M %p'),
                              points: event.points,
                              id: event.id
                            }
      end
    end
    render json: { events: unclaimed_events }
  end

  def generate_events
    e = Event.create
    e.create_events(1)
    e.destroy
    redirect_to '/'
  end

  def claim
    p params
    event = Event.find(params[:event_id])
    p event
    event.event_claimer_id = current_user.id
    event.save
    render json: {status: true}
  end

  private
    def claim_event_params
      params.permit(:event_id)
    end
end
