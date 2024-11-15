import { useQuery } from "@tanstack/react-query";
import { getAllEvents } from "../queries";
import { eventSchema } from "../event";

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
	const events = data?.map((event) => eventSchema.parse(event));

	return {
		isLoading,
		isError,
		events,
	};
};

export default useEvents;
