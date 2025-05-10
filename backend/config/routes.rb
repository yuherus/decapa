Rails.application.routes.draw do
  namespace :api do
    namespace :v1 do
      # Routes xác thực mới với JWT
      namespace :auth do
        post '/login', to: 'auth#login'
        post '/register', to: 'auth#register'
        post '/logout', to: 'auth#logout'
        get '/verify', to: 'auth#verify_token'
        # Routes cho OAuth
        get '/facebook/callback', to: 'omniauth_callbacks#facebook'
        get '/google_oauth2/callback', to: 'omniauth_callbacks#google_oauth2'
      end
      
      # Giữ lại các route OAuth của Devise
      devise_for :accounts, 
                skip: [:sessions, :registrations, :passwords],
                path: 'auth/devise', 
                controllers: {
                  omniauth_callbacks: 'api/v1/auth/omniauth_callbacks'
                },
                defaults: { format: :json }
      
      # Thêm route riêng cho OAuth callback
      devise_scope :account do
        get '/auth/:provider/callback', to: 'auth/omniauth_callbacks#passthru'
      end
      
      # Countries API           
      resources :countries, only: [:index, :show]
                 
      resources :jobs
      resources :companies do
        member do
          post :follow
          delete :unfollow
        end
      end

      # Routes cho user profile
      get '/users/profile', to: 'users#profile'
      patch '/users/update_profile', to: 'users#update_profile'
      resources :users, only: [:show]
      
      # Routes cho CV
      resources :user_cvs do
        member do
          put :set_default
          get :download
        end
      end
      
      # Routes cho các thành phần của profile
      resources :user_educations
      resources :user_experiences
      resources :user_projects
      resources :user_certificates
      resources :user_awards
      resources :user_skills
      resources :skills
      post "/user_skills/bulk_create", to: "user_skills#bulk_create"
      resources :user_social_links
      post "/user_social_links/bulk_create", to: "user_social_links#bulk_create"

      # Routes cho đơn ứng tuyển
      resources :applications

      namespace :enterprise do
        resources :jobs
        resources :applications do
          member do
            get :download_cv
          end
        end
        resource :company, only: [:show, :update]
      end

      namespace :admin do
        resources :companies
        resources :jobs
      end

      resources :skills, only: [:index, :show]
    end
  end
end
