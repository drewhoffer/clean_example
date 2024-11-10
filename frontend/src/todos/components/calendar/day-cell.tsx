import { cn } from "@/lib";
import { Day } from "@/todos/contexts";

interface DayCellProps {
	day: Day;
	onDateClick?: (date: string) => void;
}

export const DayCell = ({ day, onDateClick }: DayCellProps) => {
	return (
		<div
			key={day.date}
			className={cn(
				day.isCurrentMonth ? "bg-white" : "bg-gray-50 text-gray-500",
				"relative px-3 py-2 text-center",
			)}
			onClick={() => onDateClick?.(day.date)}
		>
			<time
				dateTime={day.date}
				className={day.isToday
					? "flex h-6 w-6 items-center justify-center mx-auto rounded-full bg-indigo-600 font-semibold text-white"
					: undefined}
			>
				{day?.date?.split("-").pop()?.replace(/^0/, "") ?? ""}
			</time>
			{day.todos?.length > 0 && (
				<ol className="mt-2">
					{day.todos.slice(0, 2).map((todo) => (
						<li key={todo.id}>
							<a href={"#"} className="group flex">
								<p className="flex-auto truncate font-medium text-gray-900 group-hover:text-indigo-600">
									{todo.title}
								</p>
								<time
									dateTime={todo.due_date.toISOString()}
									className="ml-3 hidden flex-none text-gray-500 group-hover:text-indigo-600 xl:block"
								>
									{todo.due_date.toLocaleDateString()}
								</time>
							</a>
						</li>
					))}
					{day.todos.length > 2 && (
						<li className="text-gray-500">
							+ {day.todos.length - 2} more
						</li>
					)}
				</ol>
			)}
		</div>
	);
};
export default DayCell;
