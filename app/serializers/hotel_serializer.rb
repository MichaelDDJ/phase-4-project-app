class HotelSerializer < ActiveModel::Serializer
  attributes :id, :name, :address
  has_many :reviews
end
