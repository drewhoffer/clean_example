import { useQuery } from "@tanstack/react-query";
import { getAllTodos } from "../queries";

export const useTodos = () => {
	const { isLoading, isError, data } = useQuery({
		queryKey: ["todos"],
		queryFn: getAllTodos,
	});

	return {
		isLoading,
		isError,
		todos: data,
	};
};

export default useTodos;
