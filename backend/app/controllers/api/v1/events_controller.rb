module Api::V1
  class EventsController < ApplicationController
    def index
      month = params[:month].to_i
      year = params[:year].to_i

      events = GoogleCalendarService.new(Current.user).fetch_events(month, year)
      render json: events
    end
  end
end
