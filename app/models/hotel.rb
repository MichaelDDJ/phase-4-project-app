class Hotel < ApplicationRecord
    has_many :reviews, dependent: :destroy
    has_many :users, through: :reviews

    validates :name, :address, presence: true

end
