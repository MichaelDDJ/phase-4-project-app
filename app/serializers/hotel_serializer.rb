class HotelSerializer < ActiveModel::Serializer
  attributes :id, :name, :address
  has_many :reviews
  has_many :users, through: :reviews

end
