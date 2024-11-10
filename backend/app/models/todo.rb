class Todo < ApplicationRecord
  validates :title, presence: { message: "is required" }
  validates :description, presence: { message: "is required" }
  validates :due_date, presence: { message: "is required" }
  validates :completed, inclusion: { in: [true, false], message: "must be true or false" }
end
