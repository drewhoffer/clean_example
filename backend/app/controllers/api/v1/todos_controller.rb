require 'google/apis/calendar_v3'
require 'googleauth'
require 'googleauth/stores/file_token_store'


module Api::V1
  class TodosController < ApplicationController
    before_action :set_todo, only: %i[ show update destroy ]

    # GET /todos
    def index
      @todos = Todo.all

      if params[:include_google_events] == 'true'
        google_events = fetch_google_calendar_events
        @todos = @todos + google_events
      end

      render json: @todos
    end

    # GET /todos/1
    def show
      render json: @todo
    end

    # POST /todos
    def create
      @todo = Todo.new(todo_params)
      @todo.save!
      render json: @todo, status: :created
    end

    # PATCH/PUT /todos/1
    def update
      @todo.update!(todo_params)
      render json: @todo
    end

    # DELETE /todos/1
    def destroy
      @todo.destroy!
    end

    def destroy_many
      Todo.where(id: params[:ids]).destroy_all
      head :no_content
    end

    private
      # Use callbacks to share common setup or constraints between actions.
      def set_todo
        @todo = Todo.find(params[:id])
      end

      # Only allow a list of trusted parameters through.
      def todo_params
        params.require(:todo).permit(:title, :description,:due_date, :completed)
      end

      def destroy_many_params
        params.permit(ids: [])
      end


      def fetch_google_calendar_events
        calendar = Google::Apis::CalendarV3::CalendarService.new
        calendar.authorization = Current.user.oauth_token # Ensure you have this token stored in your user session or database

        calendar_id = 'primary'
        result = calendar.list_events(calendar_id)
        # calendar = Google::Apis::CalendarV3::CalendarService.new
        # calendar.authorization = credentials_for(Google::Apis::CalendarV3::AUTH_CALENDAR)
        # calendar_id = 'primary'
        # @result = calendar.list_events(calendar_id,
        #                                 max_results: 10,
        #                                 single_events: true,
        #                                 order_by: 'startTime',
        #                                 time_min: Time.now.iso8601)
        result.items # This returns an array of events
      end
     def client_options
      def client_options
        {
          client_id: Rails.credentials.dig(:google, :client_id),
          client_secret: Rails.credentials.dig(:google, :client_secret),
          authorization_uri: 'https://accounts.google.com/o/oauth2/auth',
          token_credential_uri: 'https://accounts.google.com/o/oauth2/token',
          scope: Google::Apis::CalendarV3::AUTH_CALENDAR,
          redirect_uri: callback_url
        }
      end
     end
  end
end
