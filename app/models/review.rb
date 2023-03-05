class Review < ApplicationRecord
    belongs_to :user
    belongs_to :hotel

    validates :review, uniqueness: true
end
