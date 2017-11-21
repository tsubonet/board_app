namespace :greeting do

  desc "Say hello world"
  task :hello do
    puts "hello world"
  end

  # モデルにアクセスする場合は :environment を指定
  desc "Say hello to a user"
  task :hello_user => :environment do
    user = User.find_by(uid: 138662959)
    puts "hello #{user.name}"
  end
end
