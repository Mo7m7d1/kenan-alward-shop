import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";
import CheckoutForm from "./checkout-form";
import { authOptions } from "@/server/auth";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";

export const metadata = {
	title: "كنان الورد: الدفع",
	description: "أكمل عملية الشراء بسهولة وأمان في كنان الورد.",
};

export default async function page() {
	const session = await getServerSession(authOptions);
	if (!session?.user) {
		return redirect("/");
	}

	return (
		<div className="flex mt-32 items-center justify-center">
			<Card className="w-full max-w-sm">
				<CardHeader>
					<CardTitle className="text-2xl">عملية الدفع</CardTitle>
					<CardDescription>
						ادخل بياناتك للمتابعة في عملية الدفع
					</CardDescription>
				</CardHeader>
				<CardContent className="grid gap-4">
					<CheckoutForm />
				</CardContent>
			</Card>
		</div>
	);
}
