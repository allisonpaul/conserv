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

    p prospective_events.sort
  end


  def create_event
  end

# 0, 75, 95, 100, 137, 144
end

values.group_by {|v,i| (v-(sucker[i-1]) > -5) && (v-(sucker[i+1]) < 0) }


[235, 863, 865, 867, 870, 871, 872, 873, 874, 1026, 1027, 1028, 1029, 1030, 1032]

# sucker
# y case: 863 - 865 = -2    x - sucker[x+1] < 0
# y case: 863 - 235 = 628   x - sucker[x-1] > 5

sucker.group_by.with_index{ |v,i| (sucker[i+1] != nil) && (v - sucker[i+1] < 0) && (v - sucker[i-1] > 5) }
sucker.group_by{ |x| (x > start_point) && (x < start_point + 20) }

master_array = []
start_points.each do |starting_point|
  sub_array = []
  sucker.each do |data_point|
    if data_point.to_i > starting_point.to_i && data_point.to_i < ((starting_point.to_i)+20)
      sub_array << data_point
    end
  end
  master_array << sub_array
end



