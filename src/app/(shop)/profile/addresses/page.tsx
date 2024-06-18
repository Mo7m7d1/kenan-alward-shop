import { Button } from "@/components/ui/button";
import { PlusIcon } from "lucide-react";
import { Link } from "next-view-transitions";
import LoadingSpinner from "@/components/shared/loading-spinner";
import { getAddresses } from "@/server/models/adress";
import { Suspense } from "react";
import AddressesTable from "./components/table";
import { Heading } from "@/components/ui/heading";
import { redirect } from "next/navigation";
import { getServerAuth } from "@/lib/utils";

export const metadata = {
	title: "كنان الورد: عناويني",
	description: "إدارة العناوين المسجلة في حسابك في كنان الورد.",
};

export default async function AddressesPage() {
	const session = await getServerAuth();
	if (!session?.user) {
		return redirect("/");
	}
	return (
		<div className="flex-col">
			<div className="flex-1 gap-6">
				<div className="flex items-center justify-between mb-10">
					<Link href="/profile/addresses/new">
						<Button>
							اضافة <PlusIcon className="mr- h-4" />
						</Button>
					</Link>
				</div>

				<Heading
					title="العنوانين الخاصة بك"
					description="قائمة بالعنوانين التي قمت بحفظها"
				/>
				<Suspense key={Math.random()} fallback={<LoadingSpinner />}>
					<AddressSection />
				</Suspense>
			</div>
		</div>
	);
}

async function AddressSection() {
	const addresses = await getAddresses();
	return <AddressesTable addresses={addresses} />;
}
