module Api::V1
  class ApplicationController < ActionController::API
    include ActionController::HttpAuthentication::Token::ControllerMethods
    include ApiException::Handler
    include ActionController::Cookies

    before_action :set_current_request_details
    before_action :authenticate

    private
      def authenticate
        if session_record = Session.find_by_id(cookies.signed[:session_token])
          Current.session = session_record
        else
            render json: { error: 'Unauthorized' }, status: :unauthorized
          # request_http_token_authentication
        end
      end

      def set_current_request_details
        Current.user_agent = request.user_agent
        Current.ip_address = request.ip
      end
  end
end
