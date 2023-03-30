class UserReviewSerializer < ActiveModel::Serializer
  attributes :id, :review, :hotel
  belongs_to :user
  belongs_to :hotel

end
