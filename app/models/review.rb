class Review < ApplicationRecord
    belongs_to :user
    belongs_to :hotel

    validates :review, length: {minimum: 2}
end
