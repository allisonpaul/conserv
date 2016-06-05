class House < ActiveRecord::Base

  has_many :users

  def get_users_and_points
    users = User.where(house_id: self.id)
    results = []
    users.each do |user|
      events = Event.where(event_claimer_id: user.id)
      results << {"username" => user.username, "points" => events.sum(:points)}
    end
    results
  end
end
