import { useForm } from "react-hook-form";
import { Login, loginSchema } from "../validations";
import { zodResolver } from "@hookform/resolvers/zod";
import {
	Button,
	Form,
	FormControl,
	FormDescription,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
	Input,
	Label,
} from "@/lib/ui";
import Link from "next/link";
import { login } from "../mutations";
import { getGoogleOAuthURL } from "../utils/getGoogleOAuthUrl";

interface LoginFormProps {
	onSuccess?: () => unknown;
}

export const LoginForm = ({ onSuccess }: LoginFormProps) => {
	const form = useForm<Login>({
		resolver: zodResolver(loginSchema),
		defaultValues: {
			email: "",
			password: "",
		},
	});

	async function onSubmit(values: Login) {
		try {
			await login(values);
			onSuccess?.();
		} catch (error) {
			console.error(error);
		}
	}
	return (
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
										This is your public display name.
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
			<div className="mt-2">
				<a href={getGoogleOAuthURL()}>
					<Button
						data-onsuccess="onSignIn"
						variant="outline"
						className="w-full"
					>
						Continue with Google
					</Button>
				</a>
			</div>
		</Form>
	);
};

export default LoginForm;
