class UsersController < ApplicationController
    wrap_parameters format: []
    rescue_from ActiveRecord::RecordInvalid, with: :render_unprocessable_entity
    rescue_from ActiveRecord::RecordNotFound, with: :render_not_found

    skip_before_action :authorized, only: [:create, :show, :destroy]
    def create
        user = User.create!(user_params)
        render json: user, status: :ok
    #rescue ActiveRecord::RecordInvalid
        #render_create_user_errors
    end

    def show
        user = User.find(session[:user_id])
        render json: user, include: :reviews
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
        render json:{error: "Couldn't verify user. Please login."}, status: :not_found
    end

    def render_unprocessable_entity(invalid)
        render json:{error: invalid.record.errors}, status: :unprocessable_entity
    end

    def user_params
        params.permit(:first_name, :last_name, :password, :email)
    end

    def render_create_user_errors
        render json: {error: "Cannot leave fields blank."}, status: :unprocessable_entity
    end
end
