class HotelsController < ApplicationController
    rescue_from ActiveRecord::RecordInvalid, with: :render_unprocessable_entity
    skip_before_action :authorized, only: [:index]
    def index
        hotels = Hotel.all
        render json: hotels, include: ['reviews', 'reviews.user'], status: :ok
    end

    def create
        hotel = Hotel.create!(hotel_params)
        render json: hotel, status: :created
    end

    private

    def hotel_params
        params.permit(:name, :address)
    end

    def render_unprocessable_entity(invalid)
        render json:{error: invalid.record.errors.full_messages}, status: :unprocessable_entity
    end
end
