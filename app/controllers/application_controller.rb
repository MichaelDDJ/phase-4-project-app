class ApplicationController < ActionController::API
  include ActionController::Cookies

  before_action :authorized
  def authorized
    return render json: {error: "User session has been terminated. Please refresh page."}, status: :unauthorized unless session.include? :user_id
  end
end
