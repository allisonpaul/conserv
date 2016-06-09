class User < ActiveRecord::Base
  has_secure_password

  belongs_to :device
  belongs_to :house
  has_many  :events, class_name: "Event", foreign_key: "event_claimer_id"

  # validates :username, :email, { presence: true }
  # validates :password, { length: { minimum: 4}}
  # validates :email, :username, { uniqueness: true }

  def average_points
    events = self.events
    if events.length > 0
      return (events.sum(:points))/events.length
    else
      return 0
    end
  end


end
