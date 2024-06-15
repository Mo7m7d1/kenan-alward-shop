import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";
import LoginForm from "./login-form";

export default function page() {
	return (
		<div className="flex h-screen items-center justify-center">
			<Card className="w-full max-w-sm">
				<CardHeader>
					<CardTitle className="text-2xl">تسجيل الدخول</CardTitle>
					<CardDescription>ادخل بياناتك للوصول الى لوحة التحكم</CardDescription>
				</CardHeader>
				<CardContent className="grid gap-4">
					<LoginForm />
				</CardContent>
			</Card>
		</div>
	);
}
