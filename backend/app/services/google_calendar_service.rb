require 'google/apis/calendar_v3'
require 'googleauth'
require 'googleauth/stores/file_token_store'

class GoogleCalendarService
  def initialize(user)
    @user = user
  end

  def fetch_events(month, year)
    calendar = Google::Apis::CalendarV3::CalendarService.new
    calendar.authorization = @user.oauth_token

    calendar_id = 'primary'
    time_min = DateTime.new(year, month, 1).iso8601
    time_max = DateTime.new(year, month, -1).end_of_month.iso8601

    result = calendar.list_events(calendar_id, time_min: time_min, time_max: time_max)
    result.items.map do |event|
      {
        id: event.id,
        title: event.summary,
        start_date: event.start.date_time,
        end_date: event.end.date_time
      }
    end
  rescue Google::Apis::AuthorizationError => e
    Rails.logger.error("Google API authorization error: #{e.message}")
    if refresh_google_token
      retry
    else
      []
    end
  end

  def create_event(event_params)
    calendar = Google::Apis::CalendarV3::CalendarService.new
    calendar.authorization = @user.oauth_token

    event = Google::Apis::CalendarV3::Event.new(
      summary: event_params[:title],
      description: event_params[:description],
      start: {
        date_time: event_params[:start_date]
      },
      end: {
        date_time: event_params[:end_date]
      }
    )

    calendar.insert_event('primary', event)
  rescue Google::Apis::AuthorizationError => e
    Rails.logger.error("Google API authorization error: #{e.message}")
    if refresh_google_token
      retry
    else
      nil
    end
  end

  private

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
