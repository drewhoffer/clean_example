# This file should ensure the existence of records required to run the application in every environment (production,
# development, test). The code here should be idempotent so that it can be executed at any point in every environment.
# The data can then be loaded with the bin/rails db:seed command (or created alongside the database with db:setup).
#
# Example:
#
#   ["Action", "Comedy", "Drama", "Horror"].each do |genre_name|
#     MovieGenre.find_or_create_by!(name: genre_name)
#   end
require 'faker'

user_id = 1
start_date = Date.new(2024, 1, 1)
end_date = Date.new(2024, 12, 31)

150.times do
  due_date = Faker::Time.between_dates(from: start_date, to: end_date, period: :all)
  Todo.create!(
    title: Faker::Lorem.sentence(word_count: 3),
    description: Faker::Lorem.paragraph,
    due_date: due_date,
    user_id: user_id
  )
end
