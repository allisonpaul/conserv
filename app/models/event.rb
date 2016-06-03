require 'firebase'
base_uri = 'https://project-3993342996594544604.firebaseio.com/'
firebase = Firebase::Client.new(base_uri)

# class Event < ActiveRecord::Base

  def get_firebase_data
    base_uri = 'https://project-3993342996594544604.firebaseio.com/'
    dataset = Firebase::Client.new(base_uri).get('').body.to_a
    dataset.reject {|datapoint| datapoint[1]['humidity'].to_i == 0}
  end

  # Search thru collection of data points
  # Check humidity levels
  # IF the current element's humidity level is higher than the previous,
    # Call a second method that does a more in depth search of the surrounding data points
    # IF that method determines that an event has happened, create a collection of those data points
      # Call a third method that creates an Event based on the data points that it is handed


  #input: firebase data set array
  #output: collection of index positions where humidity has risen
  def scan_data_for_increase
    flag_collection = []
    dataset = get_firebase_data
    dataset.each_with_index do |datapoint, index|
      if (datapoint[1]['humidity'].to_f - dataset[index-1][1]['humidity'].to_f) > 3
        flag_collection << index
      end
    end
    flag_collection
  end

  #input: firebase data set array
  #output: collection of index positions where humidity has fallen
  def scan_data_for_decrease
    flag_collection = []
    dataset = get_firebase_data
    dataset.each_with_index do |datapoint, index|
      if (datapoint[1]['humidity'].to_f - dataset[index-1][1]['humidity'].to_f) < -3
        flag_collection << index
      end
    end
    flag_collection
  end

  def gather_event_data
    upticks = scan_data_for_increase
    downticks = scan_data_for_decrease
    prospective_events = upticks + downticks

    prospective_events.sort
  end

# 0, 75, 95, 100, 137, 144
# end

# values.group_by {|v,i| (v-(sucker[i-1]) > -5) && (v-(sucker[i+1]) < 0) }


# [235, 863, 865, 867, 870, 871, 872, 873, 874, 1026, 1027, 1028, 1029, 1030, 1032]

# sucker
# y case: 863 - 865 = -2    x - sucker[x+1] < 0
# y case: 863 - 235 = 628   x - sucker[x-1] > 5
def get_starting_points
  event_points = gather_event_data
  group_by_results = event_points.group_by.with_index{ |v,i| (event_points[i+1] != nil) && (v - event_points[i+1] < 0) && (v - event_points[i-1] > 5) }
  group_by_results[true]
end

# sucker.group_by{ |x| (x > start_point) && (x < start_point + 20) }


def group_events
  start_points = get_starting_points
  event_points = gather_event_data
  master_array = []

  start_points.each do |starting_point|
    sub_array = []
    event_points.each do |data_point|
      if data_point.to_i > starting_point.to_i && data_point.to_i < ((starting_point.to_i)+20)
        sub_array << data_point
      end
    end
    master_array << sub_array
  end
  master_array
end

def get_event_groups
  events = []
  ray = get_firebase_data
  event_groups = group_events
  event_groups = event_groups.reject{ |array| array.empty? }
  event_groups.each do |subarray|
    events << ray[subarray[0]..subarray[-1]]
  end
  events
end

# end

  # next steps
  # -find the duration of the event and store in the database
  # - time of the subarray [-1] - subarray[0]

