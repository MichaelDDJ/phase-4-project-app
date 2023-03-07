class ReviewsController < ApplicationController
    def create
        review = Review.create!(review_params)
        render json: review, include: :hotel, status: :ok
    end

    private

    def review_params
        params.permit(:review, :user_id, :hotel_id)
    end

    
end
