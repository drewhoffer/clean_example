import { Cross2Icon } from "@radix-ui/react-icons";
import { Table } from "@tanstack/react-table";

import { Button, Input } from "@/lib/ui";
import { DataTableViewOptions } from "./data-table-view-options";
import { DataTableFacetedFilter } from "./data-table-faceted-filter";
import DataTableCreateButton from "./data-table-create-button";
import { CheckIcon, XIcon } from "lucide-react";

interface DataTableToolbarProps<TData> {
	table: Table<TData>;
}

export function DataTableToolbar<TData>({
	table,
}: DataTableToolbarProps<TData>) {
	const isFiltered = table.getState().columnFilters.length > 0;

	return (
		<div className="flex items-center justify-between">
			<div className="flex flex-1 items-center space-x-2">
				<Input
					placeholder="Filter tasks..."
					value={(table.getColumn("title")
						?.getFilterValue() as string) ?? ""}
					onChange={(event) =>
						table.getColumn("title")?.setFilterValue(
							event.target.value,
						)}
					className="h-8 w-[150px] lg:w-[250px]"
				/>
				{
					/* {table.getColumn("due_date") && (
					<DataTableFacetedFilter
						column={table.getColumn("status")}
						title="Status"
						options={statuses}
					/>
				)} */
				}
				{table.getColumn("completed") && (
					<DataTableFacetedFilter
						column={table.getColumn("completed")}
						title="Completed"
						options={[{
							label: "Not completed",
							value: "false",
							icon: XIcon,
						}, {
							label: "Completed",
							value: "true",
							icon: CheckIcon,
						}]}
					/>
				)}
				{isFiltered && (
					<Button
						variant="ghost"
						onClick={() => table.resetColumnFilters()}
						className="h-8 px-2 lg:px-3"
					>
						Reset
						<Cross2Icon className="ml-2 h-4 w-4" />
					</Button>
				)}
			</div>
			<div className="flex items-center gap-1">
				<DataTableViewOptions table={table} />
				<DataTableCreateButton />
			</div>
		</div>
	);
}
