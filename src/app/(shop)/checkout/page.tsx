import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";
import CheckoutForm from "./checkout-form";
import { redirect } from "next/navigation";
import { getServerAuth } from "@/lib/utils";

export const metadata = {
	title: "كنان الورد: الدفع",
	description: "أكمل عملية الشراء بسهولة وأمان في كنان الورد.",
};

export default async function page() {
	const session = await getServerAuth();
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
