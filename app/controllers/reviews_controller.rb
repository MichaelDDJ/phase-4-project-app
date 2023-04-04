
class ReviewsController < ApplicationController
    rescue_from ActiveRecord::RecordInvalid, with: :render_unprocessable_entity
    def create
        user = User.find(session[:user_id])
        review = user.reviews.create!(review_params)
        render json: review, include: [:user, :hotel], status: :ok
    end
    
    def destroy
        user = User.find(session[:user_id])
        review = user.reviews.find_by(id: params[:id])
        if review
            review.destroy
            render json: review, status: :ok
        else
            render json: { error: "Review not found" }, status: :not_found
        end
    end 

    def update
        user = User.find(session[:user_id])
        review = user.reviews.find_by(id: params[:id])
        if review
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
