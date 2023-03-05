class UsersController < ApplicationController
    wrap_parameters format: []
    rescue_from ActiveRecord::RecordInvalid, with: :render_unprocessable_entity

    skip_before_action :authorized, only: [:create, :show]
    def create
        user = User.create!(user_params)
        render json: user, status: :ok
    end

    def show
        user = User.find(session[:user_id])
        render json: user
    end

    private

    def render_unprocessable_entity(invalid)
        render json:{error: invalid.record.errors}, status: :unprocessable_entity
    end

    def user_params
        params.permit(:first_name, :last_name, :password, :email)
    end 
end
