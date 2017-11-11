class User < ApplicationRecord
  has_many :topics, dependent: :destroy
  has_many :likes, dependent: :destroy
  #has_many :liked_topics, through: :likes, source: :topic

  def self.find_or_create_from_auth(auth)
    provider  = auth[:provider]
    uid       = auth[:uid]
    nickname  = auth[:info][:nickname]
    image_url = auth[:info][:image]

    self.find_or_create_by(provider: provider, uid: uid) do |user|
      user.nickname  = nickname
      user.image_url = image_url
      user.name      = ((0..9).to_a + ("a".."z").to_a + ("A".."Z").to_a).sample(8).join
    end
  end

end
