class Device < ActiveRecord::Base

  has_many :users
  has_many :events

  validates :code, { presence: true }

end
