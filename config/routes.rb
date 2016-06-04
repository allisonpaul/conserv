Rails.application.routes.draw do
  get '/' => 'users#index'
  get '/users/new' => 'users#new'
  post '/users' => 'users#create'
  # resources :users
end
