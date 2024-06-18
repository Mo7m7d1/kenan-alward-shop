import { getAddress } from "@/server/models/adress";
import { AddressForm } from "./components/address-form";
import { Card, CardContent } from "@/components/ui/card";
import { redirect } from "next/navigation";
import { getServerAuth } from "@/lib/utils";

export const metadata = {
	title: "كنان الورد: عناويني",
	description: "إدارة العناوين المسجلة في حسابك في كنان الورد.",
};

export default async function AddressPage({
	params,
}: {
	params: { addressId: string };
}) {
	const session = await getServerAuth();
	if (!session?.user) {
		return redirect("/");
	}

	const address = await getAddress(params.addressId);

	return (
		<div className="flex h-screen items-center justify-center">
			<Card className="w-full">
				<CardContent className="grid gap-4">
					<AddressForm initialData={address!} />
				</CardContent>
			</Card>
		</div>
	);
}
