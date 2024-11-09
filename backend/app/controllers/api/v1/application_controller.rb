module Api::V1
  class ApplicationController < ActionController::API
    include ActionController::HttpAuthentication::Token::ControllerMethods
    include ApiException::Handler
    include ActionController::Cookies
    # after_action :set_csrf_cookie
    # skip_before_action :verify_authenticity_token

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

      # https://medium.com/codex/deploying-a-rails-api-react-app-with-sessions-and-csrf-tokens-d33d2924639
      # def set_csrf_cookie
      #   cookies["CSRF-TOKEN"] = {
      #     value: form_authenticity_token,
      #     secure: true,
      #     same_site: :strict,
      #     domain: 'localhost:3001'
      #   }
      # end
  end
end
