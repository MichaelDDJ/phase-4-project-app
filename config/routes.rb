Rails.application.routes.draw do
  resources :users, only: [:create, :update, :destroy]
  resources :hotels, only: [:index, :create]
  resources :reviews, only: [:create, :destroy, :update]

  post '/login', to: 'sessions#create'
  get '/auth', to: "users#show"
  delete '/logout', to: "sessions#destroy"
  post '/reviews', to: "reviews#create"
  get '/user_reviews', to: "reviews#show_user_reviews"
  # Define your application routes per the DSL in https://guides.rubyonrails.org/routing.html

  # Defines the root path route ("/")
  # root "articles#index"
end
