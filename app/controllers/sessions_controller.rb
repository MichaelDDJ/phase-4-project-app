class SessionsController < ApplicationController
    skip_before_action :authorized, only: [:create, :destroy]
    def create
        user = User.find_by(email: params[:email])
        if user&.authenticate(params[:password])
            session[:user_id] = user.id
            render json: user, include: :reviews, status: :created
        else
            render json: {error: "Invalid email or password"}, status: :unauthorized
        end
    end

    def destroy
        if session[:user_id]
            session.delete :user_id
            render json: {response: "Logged out"}, status: :ok
        else
            render json: {errors: ["Not authorized"]}, status: :unauthorized
        end
    end
end
