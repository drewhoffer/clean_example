module Api::V1
  class RegistrationsController < ApplicationController
    skip_before_action :authenticate

    def create
      @user = User.new(user_params)
      @user.save!
      send_email_verification
      render json: @user.as_json(except: [:password_digest]), status: :created
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
