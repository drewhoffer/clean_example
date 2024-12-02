import { columns, DataTable, useTodos } from "@/todos";
import { SidebarProvider, SidebarTrigger } from "@/lib/ui";
import { AppSidebar, UserNav } from "@/core";
import { redirect } from "@/auth";
import { GetServerSideProps, InferGetServerSidePropsType } from "next";
import axios from "axios";

export default function Home({
  todos: initialTodos,
}: InferGetServerSidePropsType<typeof getServerSideProps>) {
  const { todos, isError, isLoading } = useTodos({ initialTodos });

  if (isError) {
    return <div>Error...</div>;
  }

  if (isLoading) {
    return <div>Loading...</div>;
  }
  if (todos === undefined) {
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
          <DataTable columns={columns} data={todos} />
        </div>
      </div>
    </SidebarProvider>
  );
}

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  try {
    await axios.get("http://localhost:3000/api/v1/sessions", {
      headers: { cookie: ctx.req.headers.cookie },
    });
    const { data: todosData } = await axios.get(
      "http://localhost:3000/api/v1/todos",
      {
        headers: { cookie: ctx.req.headers.cookie },
      }
    );
    return {
      props: { todos: todosData }, // Pass any props to the page component if needed
    };
  } catch (e) {
    console.log(e);
    return redirect("/login");
  }
};
