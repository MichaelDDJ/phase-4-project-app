class HotelsController < ApplicationController
    rescue_from ActiveRecord::RecordInvalid, with: :render_unprocessable_entity
    skip_before_action :authorized, only: [:index]
    def index
        hotels = Hotel.all
        render json: hotels, include: ['reviews', 'reviews.user.first_name'], status: :ok
    end

    def create
        hotel = Hotel.create!(hotel_params)
        render json: hotel, status: :created
    end

    def destroy
        hotel = Hotel.find_by(id: params[:id])
        if hotel
            hotel.destroy
            render json: hotel, status: :ok
        else
            render json: { error: "Hotel not found" }, status: :not_found
        end
    end

    private

    def hotel_params
        params.permit(:name, :address)
    end

    def render_unprocessable_entity(invalid)
        render json:{error: invalid.record.errors.full_messages}, status: :unprocessable_entity
    end
end
