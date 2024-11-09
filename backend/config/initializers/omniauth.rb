Rails.application.config.middleware.use OmniAuth::Builder do
  provider :google_oauth2, Rails.application.credentials.dig(:google, :client_id), Rails.application.credentials.dig(:google, :client_secret), {
    callback_path: '/api/v1/auth/google_oauth2/callback',
    scope:"userinfo.profile,userinfo.email",
    provider_ignores_state: true

  }
end
OmniAuth.config.allowed_request_methods = %i[get]
