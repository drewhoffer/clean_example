module Api
  module V1
    class TodosController < ApplicationController
      before_action :set_todo, only: %i[ show update destroy ]

      # GET /todos
      def index
        @todos = Todo.all

        render json: @todos
      end

      # GET /todos/1
      def show
        render json: @todo
      end

      # POST /todos
      def create
        @todo = Todo.new(todo_params)
        @todo.save!
        render json: @todo, status: :created

      end

      # PATCH/PUT /todos/1
      def update
        @todo.update!(todo_params)
        render json: @todo
      end

      # DELETE /todos/1
      def destroy
        @todo.destroy!
      end

      private
        # Use callbacks to share common setup or constraints between actions.
        def set_todo
          @todo = Todo.find(params[:id])
        end

        # Only allow a list of trusted parameters through.
        def todo_params
          params.require(:todo).permit(:title, :status, :label, :priority, :description)
        end
    end
  end
end
