import {
	Card,
	CardDescription,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";
import ProductsTable from "./table";
import Link from "next/link";
import { buttonVariants } from "@/components/ui/button";

export default function page() {
	return (
		<main
			className="my-5 flex w-full flex-col items-start gap-4 p-4 sm:px-6 sm:py-0"
			dir="rtl"
		>
			<div className="ml-auto flex items-center gap-2">
				<Link
					className={buttonVariants({ size: "sm" })}
					href={"/dashboard/products/product"}
				>
					إضافة منتج
				</Link>
			</div>
			<Card x-chunk="dashboard-06-chunk-0" dir="rtl" className="w-full">
				<CardHeader>
					<CardTitle>المنتجات</CardTitle>
					<CardDescription>إدارة المنتجات الخاصة بك.</CardDescription>
				</CardHeader>
				<ProductsTable />
			</Card>
		</main>
	);
}
