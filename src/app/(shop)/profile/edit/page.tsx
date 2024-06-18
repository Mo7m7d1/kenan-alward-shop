import { getUser } from "@/server/models/user";
import { UserForm } from "./user-form";
import { notFound, redirect } from "next/navigation";
import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";
import { getServerAuth } from "@/lib/utils";

export const metadata = {
	title: "كنان الورد: تعديل الملف الشخصي",
	description: "قم بتحديث معلوماتك الشخصية في كنان الورد.",
};

export default async function page() {
	const session = await getServerAuth();
	if (!session?.user) {
		return redirect("/");
	}

	const res = await getUser();
	if (!res?.success) {
		return notFound();
	}

	return (
		<div className="flex h-screen items-center justify-center">
			<Card className="w-full max-w-sm">
				<CardHeader>
					<CardTitle className="text-2xl">تعديل الحساب</CardTitle>
					<CardDescription>قم بتعديل بيانات حسابك </CardDescription>
				</CardHeader>
				<CardContent className="grid gap-4">
					<UserForm initialData={res.user} />
				</CardContent>
			</Card>
		</div>
	);
}
