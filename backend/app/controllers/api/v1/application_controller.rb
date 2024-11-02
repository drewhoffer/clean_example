module Api
  module V1
    class ApplicationController < ActionController::API
      include ApiException::Handler
    end
  end
end
