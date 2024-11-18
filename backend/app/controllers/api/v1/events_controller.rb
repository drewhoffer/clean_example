module Api::V1
  class EventsController < ApplicationController
    def index
      month = params[:month].to_i
      year = params[:year].to_i

      events = GoogleCalendarService.new(Current.user).fetch_events(month, year)
      render json: events
    end

    def create
      event = GoogleCalendarService.new(Current.user).create_event(event_params)
      render json: event
    end

    private

    def event_params
      params.require(:event).permit(:title, :description, :start_date, :end_date)
    end
  end
end
