require 'google/apis/calendar_v3'
require 'googleauth'
require 'googleauth/stores/file_token_store'

class Api::V1::EventsController < ApplicationController
  def index
  end


  private
    def fetch_google_calendar_events
      calendar = Google::Apis::CalendarV3::CalendarService.new
      calendar.authorization = Current.user.oauth_token

      calendar_id = 'primary'
      result = calendar.list_events(calendar_id, max_results: 5)
      result.items.map do |event|
        {
          id: event.id,
          title: event.summary,
          # start: event.start.date_time,
          due_date: event.end.date_time
        }
      end
    rescue Google::Apis::AuthorizationError => e
      # Handle the 401 error
      Rails.logger.error("Google API authorization error: #{e.message}")
      if refresh_google_token
        retry
      else
        []
      end
    end


    def refresh_google_token
      refresh_token = Current.user.refresh_token
      return false unless refresh_token

      client = Signet::OAuth2::Client.new(
        client_id: Rails.application.credentials.dig(:google, :client_id),
        client_secret: Rails.application.credentials.dig(:google, :client_secret),
        token_credential_uri: 'https://accounts.google.com/o/oauth2/token',
        refresh_token: refresh_token
      )

      response = client.refresh!
      Rails.logger.info("Response from Google: #{response}")
      Current.user.update(oauth_token: response['access_token'])
      true
    rescue StandardError => e
      Rails.logger.error("Failed to refresh Google token: #{e.message}")
      false
    end
end
