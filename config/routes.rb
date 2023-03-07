Rails.application.routes.draw do
  resources :users
  resources :hotels
  resources :reviews

  post '/login', to: 'sessions#create'
  get '/auth', to: "users#show"
  delete '/logout', to: "sessions#destroy"
  post '/reviews', to: "reviews#create"
  # Define your application routes per the DSL in https://guides.rubyonrails.org/routing.html

  # Defines the root path route ("/")
  # root "articles#index"
end
