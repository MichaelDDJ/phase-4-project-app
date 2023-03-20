class ReviewsController < ApplicationController
    rescue_from ActiveRecord::RecordInvalid, with: :render_unprocessable_entity
    def create
        user = User.find(session[:user_id])
        review = Review.new(review_params)
        user.reviews << review
        review.save
        render json: review, include: :hotel, status: :ok
    end

    def show_user_reviews
        user = User.find(session[:user_id])
        reviews = user.reviews
        render json: reviews, status: :ok
    end

    private

    def review_params
        params.permit(:review, :hotel_id)
    end

    def render_unprocessable_entity(invalid)
        render json:{error: "Review cannot be blank."}, status: :unprocessable_entity
    end

end
