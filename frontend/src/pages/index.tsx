import { z } from "zod";
import { useForm } from "react-hook-form";
import {
  Button,
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
  Input,
  Textarea,
} from "@/components/ui";
import { zodResolver } from "@hookform/resolvers/zod";
import { createTodo } from "@/todos/mutations";
import { getAllTodos } from "@/todos/queries/getAllTodos";

export default function Home() {
  const allTodos = getAllTodos();

  const formSchema = z.object({
    title: z.string().min(2).max(50),
    description: z.string().min(2).max(100),
  });
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: "",
      description: "",
    },
  });
  function onSubmit(values: z.infer<typeof formSchema>) {
    // call todos save mutation
    console.log(values);
    createTodo(
      { ...values },
    );
  }

  return (
    <div>
      <h1 className="text-center scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl">
        Todo Manager
      </h1>
      <h1 className="text-center scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl">
        Here's all your todos:
      </h1>
      <ul>
        {allTodos.map((todo) => (
          <li key={todo.id}>
            {todo.title} - {todo.description}
          </li>
        ))}
      </ul>

      <Card className="w-[350px] mt-10 mx-auto">
        <CardHeader>
          <CardTitle>Create a new Todo</CardTitle>
          <CardDescription>Give a name and description</CardDescription>
        </CardHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)}>
            <CardContent>
              <FormField
                control={form.control}
                name="title"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Username</FormLabel>
                    <FormControl>
                      <Input placeholder="shadcn" {...field} />
                    </FormControl>
                    <FormDescription>
                      This is your public display name.
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="description"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Description</FormLabel>
                    <FormControl>
                      <Textarea placeholder="shadcn" {...field} />
                    </FormControl>
                    <FormDescription>
                      This is your public display name.
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </CardContent>
            <CardFooter>
              <Button type="submit">Create</Button>
            </CardFooter>
          </form>
        </Form>
      </Card>
    </div>
  );
}
