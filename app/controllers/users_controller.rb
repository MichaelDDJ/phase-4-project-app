class UsersController < ApplicationController
    wrap_parameters format: []
    rescue_from ActiveRecord::RecordInvalid, with: :render_unprocessable_entity
    rescue_from ActiveRecord::RecordNotFound, with: :render_not_found

    skip_before_action :authorized, only: [:create, :show, :destroy]
    def create
        user = User.create!(user_params)
        if user&.authenticate(params[:password])
            session[:user_id] = user.id
            render json: user, include: :reviews, status: :created
        else
            render json: {error: "Something went wrong. Please try again"}, status: :unauthorized
        end
    end

    def show
        user = User.find(session[:user_id])
        render json: user, include: :reviews, status: :ok
    end

    def update
        user = User.find(session[:user_id])
        user.update!(user_params)
        render json: user, status: :accepted
    end

    def destroy
        user = User.find_by(id:params[:id])
        if user
            user.destroy
            head :no_content
        else
            render json: {error: "Logout error"}, status: :not_found
        end
    end

    

    private

    def render_not_found
        render json:{error: ["Couldn't verify user. Please login."]}, status: :not_found
    end

    def render_unprocessable_entity(invalid)
        render json:{error: invalid.record.errors.full_messages}, status: :unprocessable_entity
    end

    def user_params
        params.permit(:first_name, :last_name, :password, :email)
    end
end
