import LoadingSpinner from "@/components/shared/loading-spinner";
import {
	Card,
	CardHeader,
	CardTitle,
	CardDescription,
	CardContent,
} from "@/components/ui/card";
import {
	Table,
	TableBody,
	TableCell,
	TableHead,
	TableHeader,
	TableRow,
} from "@/components/ui/table";
import { formatDateArabic, formatMoney, getServerAuth } from "@/lib/utils";
import { getCustomerOrders } from "@/server/models/user";
import { notFound, redirect } from "next/navigation";
import { Suspense } from "react";

export const metadata = {
	title: "كنان الورد: طلباتي",
	description: "استعرض وتتبع طلباتك السابقة في كنان الورد.",
};

export default async function page() {
	const session = await getServerAuth();
	if (!session?.user) {
		return redirect("/");
	}
	return (
		<main>
			<Card dir="rtl" className=" w-full">
				<CardHeader>
					<CardTitle>الطلبات</CardTitle>
					<CardDescription>قائمة بالطلبات الخاصة بك .</CardDescription>
				</CardHeader>
				<CardContent>
					<Suspense key={Math.random()} fallback={<LoadingSpinner />}>
						<CustomerOrdersTable />
					</Suspense>
				</CardContent>
			</Card>
		</main>
	);
}

async function CustomerOrdersTable() {
	const res = await getCustomerOrders();

	if (!res?.success) {
		return notFound();
	}

	const orderStatus = {
		Processing: "جاري المعالجة",
		Shipped: "تم الشحن",
		Delivered: "تم التوصيل",
		Cancelled: "ملغي",
	};

	return (
		<Table className="scroll-my-14">
			<TableHeader>
				<TableRow>
					<TableHead className="text-right font-semibold">رقم الطلب</TableHead>
					<TableHead className="text-right font-semibold">الحالة</TableHead>
					<TableHead className="text-right font-semibold">المبلغ</TableHead>
					<TableHead className="text-right font-semibold">التاريخ</TableHead>
				</TableRow>
			</TableHeader>
			<TableBody>
				{res.orders?.map((order) => (
					<TableRow key={order.id}>
						<TableCell className="text-right">{order.number}</TableCell>
						<TableCell className="text-right">
							{orderStatus[order.status]}
						</TableCell>
						<TableCell className="text-right">
							{formatMoney(order.total)}
						</TableCell>
						<TableCell className="text-right">
							{formatDateArabic(new Date(order.createdAt).toISOString())}
						</TableCell>
					</TableRow>
				))}
			</TableBody>
		</Table>
	);
}
