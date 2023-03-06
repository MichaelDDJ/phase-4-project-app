class ReviewsSerializer < ActiveModel::Serializer
  attributes :id
  belongs_to :user
  belongs_to :hotel
end
