import {
	Card,
	CardDescription,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";
import CategoriesTable from "./table";
import { CategoryModal } from "./category-modal";

export default function page() {
	return (
		<main
			className="my-5 flex w-full flex-col items-start gap-4 p-4 sm:px-6 sm:py-0"
			dir="rtl"
		>
			<div className="ml-auto flex  items-center gap-2">
				<CategoryModal />
			</div>
			<Card x-chunk="dashboard-06-chunk-0" dir="rtl" className="w-full">
				<CardHeader>
					<CardTitle>الأقسام</CardTitle>
					<CardDescription>
						إدارة الأقسام الخاصة بك ومشاهدة أدائها.
					</CardDescription>
				</CardHeader>

				<CategoriesTable />
			</Card>
		</main>
	);
}
