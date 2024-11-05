import { SignUpForm } from "@/auth/components";
import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from "@/components/ui";
import Link from "next/link";
import { useRouter } from "next/router";

export const SignUpPage = () => {
	const router = useRouter();
	return (
		<div className="flex h-screen w-full items-center justify-center px-4">
			<Card className="mx-auto max-w-sm">
				<CardHeader>
					<CardTitle className="text-2xl">Sign Up</CardTitle>
					<CardDescription>
						Create your account below to get started
					</CardDescription>
				</CardHeader>
				<CardContent>
					<SignUpForm onSuccess={() => router.push("/login")} />
					<div className="mt-4 text-center text-sm">
						Already have an account?{" "}
						<Link href="/login" className="underline">
							Login
						</Link>
					</div>
				</CardContent>
			</Card>
		</div>
	);
};

export default SignUpPage;
