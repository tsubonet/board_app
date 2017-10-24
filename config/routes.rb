Rails.application.routes.draw do
  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html
  get '/'           => 'topics#index'
  resources :topics
  resources :comments

end
