class Booking < ApplicationRecord
    belongs_to :user
    belongs_to :hotel

    validates :dates_booked, uniqueness: true
end
