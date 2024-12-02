import { useQuery } from "@tanstack/react-query";
import { getAllTodos } from "../queries";
import { Todo } from "../todo";

interface UseTodoProps {
  initialTodos?: Todo[];
}

export const useTodos = ({ initialTodos }: UseTodoProps = {}) => {
  const { isLoading, isError, data } = useQuery({
    queryKey: ["todos"],
    queryFn: getAllTodos,
    initialData: initialTodos,
  });

  return {
    isLoading,
    isError,
    todos: data,
  };
};

export default useTodos;
