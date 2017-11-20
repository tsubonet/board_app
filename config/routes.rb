Rails.application.routes.draw do
  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html
  root :to                      => 'topics#index'
  get 'auth/:provider/callback' => 'sessions#create'
  get '/logout'                 => 'sessions#destroy'
  get '/admin'                  => 'admin#index'

  resources :topics do
    collection do
      get :ranking_weekly
      get :ranking_monthly
      get :ranking_all
    end
  end

  resources :comments, only: [:create, :destroy]
  resources :replies, only: [:create, :destroy]
  resources :likes, only: [:create, :destroy]

end
