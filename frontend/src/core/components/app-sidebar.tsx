import { Calendar, Home } from "lucide-react";

import {
	Sidebar,
	SidebarContent,
	SidebarGroup,
	SidebarGroupContent,
	SidebarGroupLabel,
	SidebarMenu,
	SidebarMenuButton,
	SidebarMenuItem,
} from "../../lib/ui/components";

// Menu items.
const items = [
	{
		title: "Todos",
		url: "/",
		icon: Home,
	},
	{
		title: "Calendar",
		url: "calendar/week",
		icon: Calendar,
	},
];

export function AppSidebar() {
	return (
		<Sidebar>
			<SidebarContent>
				<SidebarGroup>
					<SidebarGroupLabel>Todo Manager</SidebarGroupLabel>
					<SidebarGroupContent>
						<SidebarMenu>
							{
								/* <SidebarMenuItem>
								<Dialog>
									<DialogTrigger asChild>
										<SidebarMenuButton
											asChild
										>
											<a href="#">
												<PlusCircle />
												<span>Add Todo</span>
											</a>
										</SidebarMenuButton>
									</DialogTrigger>
									<CreateTodoDialog />
								</Dialog>
							</SidebarMenuItem> */
							}
							{items.map((item) => (
								<SidebarMenuItem key={item.title}>
									<SidebarMenuButton asChild>
										<a href={item.url}>
											<item.icon />
											<span>{item.title}</span>
										</a>
									</SidebarMenuButton>
								</SidebarMenuItem>
							))}
						</SidebarMenu>
					</SidebarGroupContent>
				</SidebarGroup>
			</SidebarContent>
		</Sidebar>
	);
}
