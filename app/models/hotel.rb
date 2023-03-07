class Hotel < ApplicationRecord
    has_many :reviews
    has_many :users, through: :reviews

    validates :name, :address, presence: true
end
