require 'firebase'
base_uri = 'https://project-3993342996594544604.firebaseio.com/'
firebase = Firebase::Client.new(base_uri)

class Event < ActiveRecord::Base

  def get_firebase_data
    firebase.get('').body.to_a
  end

  # Search thru collection of data points
  # Check humidity levels
  # IF the current element's humidity level is higher than the previous,
    # Call a second method that does a more in depth search of the surrounding data points
    # IF that method determines that an event has happened, create a collection of those data points
      # Call a third method that creates an Event based on the data points that it is handed


  #input: firebase data set array  #output: a call to
  def data_scan
    dataset = get_firebase_data
    dataset.each do |datapoint, index|
      if (datapoint[1]['humidity'].to_f - dataset[index-1][1]['humidity']) > 3

      end
    end
  end

  def


end
