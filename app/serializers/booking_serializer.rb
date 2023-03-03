class BookingSerializer < ActiveModel::Serializer
  attributes :id, :user_id, :hotel_id, :date_booked
end
