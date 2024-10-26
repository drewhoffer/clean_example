import { useEffect, useState } from "react";

import { columns, getAllTodos, Todo } from "@/todos";
import { DataTable } from "@/todos/components/data-table";

import { UserNav } from "@/components/user-nav";
import { SidebarProvider, SidebarTrigger } from "@/components/ui";
import { AppSidebar } from "@/components/app-sidebar";

export default function Home() {
  const [todos, setTodos] = useState<Todo[]>([]);

  useEffect(() => {
    const allTodos = getAllTodos();
    setTodos(allTodos);
  }, []);
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
          <DataTable columns={columns} data={todos} />
        </div>
      </div>
    </SidebarProvider>
  );
}
