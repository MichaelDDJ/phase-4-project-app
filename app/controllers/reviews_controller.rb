class ReviewsController < ApplicationController
    def create
        review = User.create!(review_params)
        render json: review, status: :ok
    end

    private

    def review_params
        params.permit(:review)
    end
end
