require "spec_helper"
require "rails_helper"

RSpec.describe Event, :type => :model do
  it "can process firebase data" do
    event = Event.create
    expect(event.get_event_groups.class).to be(Array)
  end

  it "can create new events" do
    event_array = [["-KJQXhFHMIcsW3rSlWLN", {"humidity"=>"69.20", "temp"=>"25.70", "time"=>"2016:06:04:08:12:11"}], ["-KJQXopXY39ByM6mjGkC", {"humidity"=>"76.80", "temp"=>"25.90", "time"=>"2016:06:04:08:12:42"}], ["-KJQXwQ4Jz3yHfnvt_yg", {"humidity"=>"85.00", "temp"=>"26.10", "time"=>"2016:06:04:08:13:13"}], ["-KJQY3-NqyzRkHRj4g6t", {"humidity"=>"90.20", "temp"=>"26.20", "time"=>"2016:06:04:08:13:44"}], ["-KJQYA_aUx03mZprFRWl", {"humidity"=>"92.20", "temp"=>"26.50", "time"=>"2016:06:04:08:14:15"}], ["-KJQYI9tco85RLfYSZeo", {"humidity"=>"93.30", "temp"=>"26.70", "time"=>"2016:06:04:08:14:46"}], ["-KJQYPk8MDFDSOL9q1Mr", {"humidity"=>"93.60", "temp"=>"26.80", "time"=>"2016:06:04:08:15:17"}], ["-KJQYXKQEjxesdl33uj6", {"humidity"=>"93.80", "temp"=>"26.90", "time"=>"2016:06:04:08:15:48"}], ["-KJQYdukcAYHUHYhsZ7U", {"humidity"=>"94.30", "temp"=>"27.20", "time"=>"2016:06:04:08:16:19"}], ["-KJQYlV0cutmW3CMik7P", {"humidity"=>"94.90", "temp"=>"27.40", "time"=>"2016:06:04:08:16:50"}], ["-KJQYt4LZpZBmScS48I2", {"humidity"=>"95.20", "temp"=>"27.60", "time"=>"2016:06:04:08:17:21"}], ["-KJQZ-ecr7O7RpzDfAL2", {"humidity"=>"95.60", "temp"=>"27.70", "time"=>"2016:06:04:08:17:52"}], ["-KJQZ7EtpW4VWqOpSocv", {"humidity"=>"95.80", "temp"=>"27.80", "time"=>"2016:06:04:08:18:23"}], ["-KJQZEpPLmjaBOcI-NVg", {"humidity"=>"96.20", "temp"=>"27.90", "time"=>"2016:06:04:08:18:54"}], ["-KJQZMPhPYiNq0f_Fj1T", {"humidity"=>"96.20", "temp"=>"28.00", "time"=>"2016:06:04:08:19:25"}], ["-KJQZTzx07KYKd8YvxO5", {"humidity"=>"96.20", "temp"=>"28.00", "time"=>"2016:06:04:08:19:56"}], ["-KJQZa_Gbt-A_lsyGaFO", {"humidity"=>"96.10", "temp"=>"27.60", "time"=>"2016:06:04:08:20:28"}], ["-KJQZi9VvPVesaVOzyFr", {"humidity"=>"88.10", "temp"=>"27.10", "time"=>"2016:06:04:08:20:59"}], ["-KJQZpjlk9ZkIBGd46t1", {"humidity"=>"60.10", "temp"=>"26.90", "time"=>"2016:06:04:08:21:30"}]]
    event = Event.create(  user_id: 1,
                    points: event_array.length,
                    start_time: DateTime.strptime(event_array[0][1]['time'], "%Y: %m: %d: %T"),
                    end_time: DateTime.strptime(event_array[-1][1]['time'], "%Y: %m: %d: %T"),)
    expect(event.start_time).to eq("Sat, 04 Jun 2016 08:12:11 +0000")
  end
end
