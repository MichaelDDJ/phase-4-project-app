class ReviewsSerializer < ActiveModel::Serializer
  attributes :id, :user_id, :hotel_id, :review
  belongs_to :user
  belongs_to :hotel
end
