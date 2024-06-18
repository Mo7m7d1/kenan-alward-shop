import { File, ListFilter, MoreHorizontal } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
	Card,
	CardContent,
	CardDescription,
	CardFooter,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";
import {
	DropdownMenu,
	DropdownMenuCheckboxItem,
	DropdownMenuContent,
	DropdownMenuLabel,
	DropdownMenuSeparator,
	DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
	Table,
	TableBody,
	TableCell,
	TableHead,
	TableHeader,
	TableRow,
} from "@/components/ui/table";
import { formatDateArabic, formatMoney } from "@/lib/utils";
import { getOrders } from "@/server/models/order";
import { Badge } from "@/components/ui/badge";
import { OrderModal } from "./order-modal";
import { orderStatus } from "@/lib/constants";

export default async function page() {
	const orders = await getOrders();
	return (
		<main
			className="my-5 flex w-full  flex-col items-start gap-4 p-4 sm:px-6 sm:py-0"
			dir="rtl"
		>
			<div className="ml-auto flex  items-center gap-2">
				<DropdownMenu>
					<DropdownMenuTrigger asChild>
						<Button variant="outline" size="sm" className="h-8 gap-1">
							<ListFilter className="h-3.5 w-3.5" />
							<span className="sr-only sm:not-sr-only sm:whitespace-nowrap">
								تصفية
							</span>
						</Button>
					</DropdownMenuTrigger>
					<DropdownMenuContent align="start">
						<DropdownMenuLabel>تصفية حسب</DropdownMenuLabel>
						<DropdownMenuSeparator />
						<DropdownMenuCheckboxItem checked>نشط</DropdownMenuCheckboxItem>
						<DropdownMenuCheckboxItem>مسودة</DropdownMenuCheckboxItem>
						<DropdownMenuCheckboxItem>مؤرشف</DropdownMenuCheckboxItem>
					</DropdownMenuContent>
				</DropdownMenu>
				<Button size="sm" variant="outline" className="h-8 gap-1">
					<File className="h-3.5 w-3.5" />
					<span className="sr-only sm:not-sr-only sm:whitespace-nowrap">
						تصدير
					</span>
				</Button>
			</div>
			<Card x-chunk="dashboard-06-chunk-0" dir="rtl" className=" w-full">
				<CardHeader>
					<CardTitle>الطلبات</CardTitle>
					<CardDescription>إدارة الطلبات الخاصة بك .</CardDescription>
				</CardHeader>
				<CardContent>
					<Table>
						<TableHeader>
							<TableRow>
								<TableHead className="text-right">رقم الطلب</TableHead>
								<TableHead className="text-right">التاريخ</TableHead>
								<TableHead className="hidden text-right md:table-cell">
									المبلغ المستحق
								</TableHead>
								<TableHead className="hidden text-right md:table-cell">
									الحالة
								</TableHead>
								<TableHead className="hidden text-right md:table-cell">
									مدفوع
								</TableHead>
								<TableHead className="hidden text-right md:table-cell">
									العميل
								</TableHead>
								<TableHead>
									<span className="sr-only">إجراءات</span>
								</TableHead>
							</TableRow>
						</TableHeader>
						<TableBody>
							{orders?.map((order) => (
								<TableRow key={order.id}>
									<TableCell className="font-medium">{order.number}</TableCell>
									<TableCell>
										{formatDateArabic(new Date(order.createdAt).toISOString())}
									</TableCell>
									<TableCell className="hidden md:table-cell">
										{formatMoney(order.payable)}
									</TableCell>
									<TableCell className="hidden md:table-cell">
										{orderStatus[order.status]}
									</TableCell>
									<TableCell className="hidden md:table-cell">
										{order.isPaid ? (
											<Badge color="green">مدفوع</Badge>
										) : (
											<Badge variant={"destructive"}>غير مدفوع</Badge>
										)}
									</TableCell>
									<TableCell className="hidden md:table-cell">
										{order.user.email}
									</TableCell>
									<TableCell>
										<DropdownMenu dir="rtl">
											<DropdownMenuTrigger asChild>
												<Button
													aria-haspopup="true"
													size="icon"
													variant="ghost"
												>
													<MoreHorizontal className="h-4 w-4" />
													<span className="sr-only">عرض القائمة</span>
												</Button>
											</DropdownMenuTrigger>
											<DropdownMenuContent
												align="start"
												className="text-center"
											>
												<DropdownMenuLabel>إجراءات</DropdownMenuLabel>
												<OrderModal
													id={order.id}
													initialData={{
														status: order.status,
														isPaid: order.isPaid,
													}}
												/>
												{/* <DropdownMenuItem>
													<form
														action={async () => {
															"use server";
															await deleteOrder(order.id);
															revalidatePath("/dashboard/orders");
														}}
														className="w-full text-center"
													>
														<Button type="submit" variant={"destructive"}>
															حذف
														</Button>
													</form>
												</DropdownMenuItem> */}
											</DropdownMenuContent>
										</DropdownMenu>
									</TableCell>
								</TableRow>
							))}
						</TableBody>
					</Table>
				</CardContent>
				<CardFooter>
					<div className="text-xs text-muted-foreground">
						عرض{" "}
						<strong>
							{orders?.length ?? 0 > 0 ? "1" : "0"}-{orders?.length}
						</strong>{" "}
						من <strong>{orders?.length}</strong> قسم
					</div>
				</CardFooter>
			</Card>
		</main>
	);
}
