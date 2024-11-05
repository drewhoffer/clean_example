Rails.application.routes.draw do
  namespace :api do
    namespace :v1 do
      resources :todos do
        collection do
          delete 'destroy_many'
        end
      end
      post "sign_in", to: "sessions#create"
      post "sign_up", to: "registrations#create"
      resources :sessions, only: [:index, :show, :destroy]
      resource  :password, only: [:edit, :update]
      namespace :identity do
        resource :email,              only: [:edit, :update]
        resource :email_verification, only: [:show, :create]
        resource :password_reset,     only: [:new, :edit, :create, :update]
      end
    end
  end

  get "up" => "rails/health#show", as: :rails_health_check
end
