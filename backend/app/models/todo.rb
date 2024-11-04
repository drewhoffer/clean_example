class Todo < ApplicationRecord
  STATUSES = %i[backlog todo in_progress done canceled]
  PRIORITIES = %i[low medium high]
  LABELS = %i[bug feature documentation]

  validates :title, presence: { message: "is required" }
  validates :description, presence: { message: "is required" }

  validate :validate_status
  validate :validate_label
  validate :validate_priority

  private
  def validate_status
    if status.blank?
      errors.add(:status, "is required")
    elsif !STATUSES.map(&:to_s).include?(status)
      errors.add(:status, "#{status} is not a valid status. Valid statuses are: #{STATUSES.join(', ')}")
    end
  end

  def validate_label
    if label.blank?
      errors.add(:label, "is required")
    elsif !LABELS.map(&:to_s).include?(label)
      errors.add(:label, "#{label} is not a valid label. Valid labels are: #{LABELS.join(', ')}")
    end
  end

  def validate_priority
    if priority.blank?
      errors.add(:priority, "is required")
    elsif !PRIORITIES.map(&:to_s).include?(priority)
      errors.add(:priority, "#{priority} is not a valid priority. Valid priorities are: #{PRIORITIES.join(', ')}")
    end
  end
end
