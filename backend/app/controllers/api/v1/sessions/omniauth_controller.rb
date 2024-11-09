module Api::V1

  class Sessions::OmniauthController < ApplicationController
    # skip_before_action :verify_authenticity_token
    skip_before_action :authenticate

    def create
      @user = User.create_with(user_params).find_or_initialize_by(omniauth_params)
      @user.save!
      @session = @user.sessions.create!
      # cookies.signed.permanent[:session_token] = { value: session_record.id, httponly: true }
      cookies.signed.permanent[:session_token] = { value: @session.id, httponly: true }
      redirect_to "http://localhost:3001", allow_other_host: true
    end

    def failure
      render json: { alert: params[:message] }, status: :unauthorized
    end

    private
      def user_params
        passHash = SecureRandom.base58
        { email: omniauth.info.email, password: passHash, password_confirmation: passHash,  verified: true }
      end

      def omniauth_params
        { provider: omniauth.provider, uid: omniauth.uid }
      end

      def omniauth
        request.env["omniauth.auth"]
      end
  end
end
