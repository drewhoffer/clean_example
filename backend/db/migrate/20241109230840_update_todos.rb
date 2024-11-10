class UpdateTodos < ActiveRecord::Migration[7.2]
  def change
    change_table :todos do |t|
      t.remove :label, :priority, :status
      t.boolean :completed, default: false, null: false
      t.date :due_date
    end
  end
end
