# require 'firebase'

# module EventModule
#   def get_firebase_data
#     base_uri = 'https://project-3993342996594544604.firebaseio.com/'
#     dataset = Firebase::Client.new(base_uri).get('').body.to_a
#     dataset.reject {|datapoint| datapoint[1]['humidity'].to_i == 0}
#   end

#   #input: firebase data set array
#   #output: collection of index positions where humidity has risen
#   def scan_data_for_increase
#     flag_collection = []
#     dataset = get_firebase_data
#     dataset.each_with_index do |datapoint, index|
#       if (datapoint[1]['humidity'].to_f - dataset[index-1][1]['humidity'].to_f) > 3
#         flag_collection << index
#       end
#     end
#     flag_collection
#   end

#   #input: firebase data set array
#   #output: collection of index positions where humidity has fallen
#   def scan_data_for_decrease
#     flag_collection = []
#     dataset = get_firebase_data
#     dataset.each_with_index do |datapoint, index|
#       if (datapoint[1]['humidity'].to_f - dataset[index-1][1]['humidity'].to_f) < -3
#         flag_collection << index
#       end
#     end
#     flag_collection
#   end

#   def gather_event_data
#     upticks = scan_data_for_increase
#     downticks = scan_data_for_decrease
#     prospective_events = upticks + downticks

#     prospective_events.sort
#   end

#   def get_starting_points
#     event_points = gather_event_data
#     group_by_results = event_points.group_by.with_index{ |v,i| (event_points[i+1] != nil) && (v - event_points[i+1] < 0) && (v - event_points[i-1] > 5) }
#     group_by_results[true]
#   end

#   def group_events
#     start_points = get_starting_points
#     event_points = gather_event_data
#     master_array = []

#     start_points.each do |starting_point|
#       sub_array = []
#       event_points.each do |data_point|
#         if data_point.to_i > starting_point.to_i && data_point.to_i < ((starting_point.to_i)+20)
#           sub_array << data_point
#         end
#       end
#       master_array << sub_array if sub_array.length >= 4
#     end
#     master_array
#   end

#   def get_event_groups
#     events = []
#     ray = get_firebase_data
#     event_groups = group_events
#     event_groups = event_groups.reject{ |array| array.empty? }
#     event_groups.each do |subarray|
#       events << ray[subarray[0]..subarray[-1]]
#     end
#     events
#   end
# end
