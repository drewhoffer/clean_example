import { useQuery } from "@tanstack/react-query";
import { getAllEvents } from "../queries";

export interface UseEventsProps {
	month: number;
	year: number;
}
export const useEvents = ({
	month,
	year,
}: UseEventsProps) => {
	const { isLoading, isError, data } = useQuery({
		queryKey: ["events", month, year],
		queryFn: () => getAllEvents({ month, year }),
	});

	return {
		isLoading,
		isError,
		events: data,
	};
};

export default useEvents;
