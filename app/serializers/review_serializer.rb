class ReviewSerializer < ActiveModel::Serializer
  attributes :id, :review
  belongs_to :user
  belongs_to :hotel

end
