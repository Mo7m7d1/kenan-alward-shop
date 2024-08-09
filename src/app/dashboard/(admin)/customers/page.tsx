import {
	Card,
	CardDescription,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";
import CustomersTable from "./table";

export default function page() {
	return (
		<main
			className="my-5 flex w-full  flex-col items-start gap-4 p-4 sm:px-6 sm:py-0"
			dir="rtl"
		>
			<Card x-chunk="dashboard-06-chunk-0" dir="rtl" className=" w-full">
				<CardHeader>
					<CardTitle>العملاء</CardTitle>
					<CardDescription>إدارة العملاء في متجرك .</CardDescription>
				</CardHeader>
				<CustomersTable />
			</Card>
		</main>
	);
}
