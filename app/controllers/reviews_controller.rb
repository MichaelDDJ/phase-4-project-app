
class ReviewsController < ApplicationController
    rescue_from ActiveRecord::RecordInvalid, with: :render_unprocessable_entity
    def create
        user = User.find(session[:user_id])
        review = Review.new(review_params)
        user.reviews << review
        review.save!
        render json: review, include: :hotel, status: :ok
    end

    def show_user_reviews
        user = User.find(session[:user_id])
        reviews = user.reviews
        render json: reviews, status: :ok
    end
    
    def destroy
        review = Review.find_by(id: params[:id])
        if (review && review.user_id == session[:user_id])
            review.destroy
            render json: review, status: :ok
        else
            render json: { error: "Review not found" }, status: :not_found
        end
    end

    def update
        review = Review.find_by(id: params[:id])
        if (review && review.user_id == session[:user_id])
            review.update!(review: params[:review]) 
            render json: review, execpt: :user, status: :ok
        else
            render json: { error: "Review not found" }, status: :not_found
        end
    end

    private

    def review_params
        params.permit(:review, :hotel_id, :id)
    end

    def render_unprocessable_entity(invalid)
        render json:{error: invalid.record.errors.full_messages}, status: :unprocessable_entity
    end

end
