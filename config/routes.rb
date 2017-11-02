Rails.application.routes.draw do
  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html
  get '/' => 'topics#index'

  resources :topics do
    collection do
      get :ranking_weekly
      get :ranking_monthly
      get :ranking_all
    end
  end

  resources :comments
  resources :replies

end
