class CreateTodos < ActiveRecord::Migration[7.2]
  def change
    create_table :todos do |t|
      t.string :title
      t.text :description
      t.string :label
      t.string :priority
      t.string :status

      t.timestamps
    end
  end
end
