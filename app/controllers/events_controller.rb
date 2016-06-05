class EventsController < ApplicationController
  def index
    puts "user"
    p current_user
    all_events = current_user.events
    # need to add column to DB  to link a device to a user
    # device_owner_id = current_user.id
    unclaimed_events = all_events
    p unclaimed_events
    render json: { events: unclaimed_events }
  end
end
