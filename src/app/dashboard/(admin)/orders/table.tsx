"use client";

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
import { Badge } from "@/components/ui/badge";
import { OrderModal } from "./order-modal";
import { orderStatus } from "@/lib/constants";
import { useEffect, useState } from "react";
import { getPaginatedOrders } from "@/server/models/order";
import { Order } from "@prisma/client";
import LoadingSpinner from "@/components/shared/loading-spinner";

export default function OrdersTable() {
	const [page, setPage] = useState(1);
	const [ordersData, setOrdersData] = useState<{
		orders: Order[];
		totalOrders: number;
	}>({
		orders: [],
		totalOrders: 0,
	});
	const [loading, setLoading] = useState(true);

	const fetchOrders = async (page: number) => {
		setLoading(true);
		const { orders, totalOrders } = await getPaginatedOrders(page, 10);
		setOrdersData({ orders, totalOrders });
		setLoading(false);
	};

	useEffect(() => {
		fetchOrders(page);
	}, [page]);

	const totalPages = Math.ceil(ordersData.totalOrders / 10);

	return (
		<>
			<CardContent>
				{loading ? (
					<div className="flex justify-center items-center h-64">
						<LoadingSpinner />
					</div>
				) : (
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
							{ordersData.orders.map((order) => (
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
										{
											// @ts-ignore
											order.user.email
										}
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
											</DropdownMenuContent>
										</DropdownMenu>
									</TableCell>
								</TableRow>
							))}
						</TableBody>
					</Table>
				)}
			</CardContent>
			<CardFooter>
				<div className="flex justify-between items-center w-full">
					<div className="text-xs text-muted-foreground">
						عرض{" "}
						<strong>
							{ordersData.orders.length > 0 ? "1" : "0"}-
							{ordersData.orders.length}
						</strong>{" "}
						من <strong>{ordersData.totalOrders}</strong>
					</div>
					<div className="flex gap-2">
						<Button onClick={() => setPage(page - 1)} disabled={page === 1}>
							السابق
						</Button>
						<Button
							onClick={() => setPage(page + 1)}
							disabled={page === totalPages}
						>
							التالي
						</Button>
					</div>
				</div>
			</CardFooter>
		</>
	);
}
