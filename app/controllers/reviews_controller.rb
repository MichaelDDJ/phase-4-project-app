class ReviewsController < ApplicationController
    rescue_from ActiveRecord::RecordInvalid, with: :render_unprocessable_entity
    def create
        review = Review.create!(review_params)
        render json: review, include: :hotel, status: :ok
    end

    def show_user_reviews
        user = User.find(session[:user_id])
        reviews = user.reviews
        render json: reviews, status: :ok
    end

    private

    def review_params
        params.permit(:review, :user_id, :hotel_id)
    end

    def render_unprocessable_entity(invalid)
        render json:{error: "Review cannot be blank."}, status: :unprocessable_entity
    end

end
