class HotelsController < ApplicationController
    skip_before_action :authorized, only: [:index]
    def index
        hotels = Hotel.all
        render json: hotels, include: :reviews, status: :ok
    end

    def create
        hotel = Hotel.create!(hotel_params)
        render json: hotel, status: :created
    end

    private

    def hotel_params
        params.permit(:name, :address)
    end
end
