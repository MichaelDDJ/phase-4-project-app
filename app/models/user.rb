class User < ApplicationRecord
    has_secure_password

    has_many :reviews
    has_many :hotels, through: :reviews

    validates :first_name, :last_name, presence: true
    #validates :email, email: true
    validates :email, uniqueness: true
end
