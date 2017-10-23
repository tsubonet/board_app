# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: 'Star Wars' }, { name: 'Lord of the Rings' }])
#   Character.create(name: 'Luke', movie: movies.first)

30.times do |i|
  Topic.create(title: "タイトル #{i}", content: "本文 #{i}", gender: "man" )
end


Tag.create([
  { name: 'セックス' },
  { name: 'オナニー' },
  { name: '性器' },
  { name: '胸' },
  { name: '体毛' },
  { name: '性病' },
  { name: '性癖' },
  { name: '妊娠' },
  { name: '避妊' },
  { name: '臭い' },
  { name: '風俗' },
  { name: '同性愛' },
  { name: 'その他' }
])
