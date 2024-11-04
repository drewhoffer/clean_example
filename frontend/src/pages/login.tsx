import { Login, login, loginSchema } from "@/auth";
import {
	Button,
	Card,
	CardContent,
	CardDescription,
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
	Label,
} from "@/components/ui";
import { zodResolver } from "@hookform/resolvers/zod";
import Link from "next/link";
import { useRouter } from "next/router";
import { useForm } from "react-hook-form";

export const LoginPage = () => {
	const form = useForm<Login>({
		resolver: zodResolver(loginSchema),
		defaultValues: {
			email: "",
			password: "",
		},
	});
	const { push } = useRouter();

	async function onSubmit(values: Login) {
		// Do something with the form values.
		// ✅ This will be type-safe and validated.
		console.log(values);
		try {
			const { token } = await login(values);
			localStorage.setItem("token", token);
			await push("/");
		} catch (error) {
			console.error(error);
		}
	}
	return (
		<div className="flex h-screen w-full items-center justify-center px-4">
			<Card className="mx-auto max-w-sm">
				<CardHeader>
					<CardTitle className="text-2xl">Login</CardTitle>
					<CardDescription>
						Enter your email below to login to your account
					</CardDescription>
				</CardHeader>
				<CardContent>
					<Form {...form}>
						<form
							onSubmit={form.handleSubmit(onSubmit)}
							className="space-y-8"
						>
							<div className="grid gap-4">
								<div className="grid gap-2">
									<FormField
										control={form.control}
										name="email"
										render={({ field }) => (
											<FormItem>
												<FormLabel>Username</FormLabel>
												<FormControl>
													<Input
														type="email"
														placeholder="example@email.com"
														{...field}
													/>
												</FormControl>
												<FormDescription>
													This is your public display
													name.
												</FormDescription>
												<FormMessage />
											</FormItem>
										)}
									/>
								</div>
								<div className="grid gap-2">
									<div className="flex items-center">
										<Label htmlFor="password">
											Password
										</Label>
										<Link
											href="#"
											className="ml-auto inline-block text-sm underline"
										>
											Forgot your password?
										</Link>
									</div>
									<FormField
										control={form.control}
										name="password"
										render={({ field }) => (
											<Input
												type="password"
												{...field}
											/>
										)}
									/>
								</div>
								<Button type="submit" className="w-full">
									Login
								</Button>
							</div>
						</form>
					</Form>
					<div className="mt-4 text-center text-sm">
						Don&apos;t have an account?{" "}
						<Link href="#" className="underline">
							Sign up
						</Link>
					</div>
				</CardContent>
			</Card>
		</div>
	);
};

export default LoginPage;
