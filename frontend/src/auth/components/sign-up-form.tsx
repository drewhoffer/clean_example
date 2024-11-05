import { useForm } from "react-hook-form";
import { SignUp, signUpSchema } from "../validations";
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
} from "@/components/ui";
import { login, signUp } from "../mutations";

interface LoginFormProps {
	onSuccess?: () => unknown;
}

export const SignUpForm = ({ onSuccess }: LoginFormProps) => {
	const form = useForm<SignUp>({
		resolver: zodResolver(signUpSchema),
		defaultValues: {
			email: "",
			password: "",
			passwordConfirmation: "",
		},
	});

	async function onSubmit(values: SignUp) {
		try {
			await signUp(values);
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
						<FormField
							control={form.control}
							name="password"
							render={({ field }) => (
								<FormItem>
									<FormLabel>Password</FormLabel>
									<FormControl>
										<Input
											type="password"
											{...field}
										/>
									</FormControl>
									<FormDescription>
										Your password must be at least 8
										characters long.
									</FormDescription>
									<FormMessage />
								</FormItem>
							)}
						/>
					</div>
					<div className="grid gap-2">
						<FormField
							control={form.control}
							name="passwordConfirmation"
							render={({ field }) => (
								<FormItem>
									<FormLabel>Confirm Password</FormLabel>
									<FormControl>
										<Input
											type="password"
											{...field}
										/>
									</FormControl>
									<FormMessage />
								</FormItem>
							)}
						/>
					</div>
					<Button type="submit" className="w-full">
						Create
					</Button>
				</div>
			</form>
		</Form>
	);
};

export default SignUpForm;
