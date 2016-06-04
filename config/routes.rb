Rails.application.routes.draw do
  get '/' => 'pages#index'
  get '/users/new' => 'users#new'
  post '/users' => 'users#create'
  post '/sessions' => 'sessions#create'
  # resources :users
end
