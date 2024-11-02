module Api::V1
  class RegistrationsController < ApplicationController
    skip_before_action :authenticate

    def create
      @user = User.new(user_params)

      if @user.save
        send_email_verification
        render json: @user, status: :created
      else
        render json: @user.errors, status: :unprocessable_entity
      end
    end
    def verify
    @user = User.find_by(verification_token: params[:verification_token])
    end

    private
      def user_params
        params.permit(:email, :password, :password_confirmation)
      end

    def send_email_verification
      UserMailer.with(user: @user).email_verification.deliver_later
    end
  end
end
