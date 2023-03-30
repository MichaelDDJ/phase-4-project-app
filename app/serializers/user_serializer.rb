class UserSerializer < ActiveModel::Serializer
  attributes :id, :first_name, :last_name
  has_many :reviews, serializer: UserReviewSerializer
  has_many :hotels, through: :reviews
end
