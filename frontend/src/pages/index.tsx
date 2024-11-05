import { columns, DataTable, getAllTodos } from "@/todos";
import { SidebarProvider, SidebarTrigger } from "@/lib/ui";
import { AppSidebar, UserNav } from "@/core";
import { useQuery } from "@tanstack/react-query";

export default function Home() {
  const { data, isError, isLoading } = useQuery({
    queryKey: ["todos"],
    queryFn: getAllTodos,
  });

  if (isError) {
    return <div>Error...</div>;
  }

  if (isLoading) {
    return <div>Loading...</div>;
  }
  if (data === undefined) {
    return <div>No data...</div>;
  }
  return (
    <SidebarProvider>
      <AppSidebar />
      <div className="container">
        <div className="hidden h-full flex-1 flex-col space-y-8 p-8 md:flex">
          <SidebarTrigger />

          <div className="flex items-center justify-between space-y-2">
            <div>
              <h2 className="text-2xl font-bold tracking-tight">
                Welcome back!
              </h2>
              <p className="text-muted-foreground">
                Here&apos;s a list of your tasks for this month!
              </p>
            </div>
            <div className="flex items-center space-x-2 ">
              <UserNav />
            </div>
          </div>
          <DataTable columns={columns} data={data} />
        </div>
      </div>
    </SidebarProvider>
  );
}
