"use client";

import { MoreHorizontal } from "lucide-react";
import { Button } from "@/components/ui/button";
import { CardContent, CardFooter } from "@/components/ui/card";
import {
	DropdownMenu,
	DropdownMenuCheckboxItem,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuLabel,
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
import { formatDateArabic } from "@/lib/utils";
import { getPaginatedCustomers, deleteUser } from "@/server/models/user";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useEffect, useState } from "react";
import LoadingSpinner from "@/components/shared/loading-spinner";
import { User } from "@prisma/client";

export default function CustomersTable() {
	const [page, setPage] = useState(1);
	const [customersData, setCustomersData] = useState<{
		customers: User[];
		totalCustomers: number;
	}>({
		customers: [],
		totalCustomers: 0,
	});
	const [loading, setLoading] = useState(true);

	const fetchCustomers = async (page: number) => {
		setLoading(true);
		const { customers, totalCustomers } = await getPaginatedCustomers(page, 10);
		setCustomersData({ customers, totalCustomers });
		setLoading(false);
	};

	useEffect(() => {
		fetchCustomers(page);
	}, [page]);

	const totalPages = Math.ceil(customersData.totalCustomers / 10);

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
								<TableHead className="text-right">#</TableHead>
								<TableHead className="hidden text-right md:table-cell">
									الصورة
								</TableHead>
								<TableHead className="hidden text-right md:table-cell">
									الإيميل
								</TableHead>
								<TableHead className="hidden text-right md:table-cell">
									تاريح الإنشاء
								</TableHead>
								<TableHead className="hidden text-right md:table-cell">
									عدد الطلبات
								</TableHead>
								<TableHead>
									<span className="sr-only">إجراءات</span>
								</TableHead>
							</TableRow>
						</TableHeader>
						<TableBody>
							{customersData.customers.map((customer, i) => (
								<TableRow key={customer.id}>
									<TableCell className="font-medium">
										{(page - 1) * 10 + i + 1}
									</TableCell>
									<TableCell className="hidden md:table-cell">
										<Avatar className="hidden h-9 w-9 sm:flex">
											<AvatarImage
												src={customer.image ?? "/images/placeholder.svg"}
												alt="Avatar"
											/>
											<AvatarFallback>{customer.email}</AvatarFallback>
										</Avatar>
									</TableCell>
									<TableCell className="hidden md:table-cell">
										{customer.email}
									</TableCell>
									<TableCell className="hidden md:table-cell">
										{formatDateArabic(
											new Date(customer.createdAt).toISOString()
										)}
									</TableCell>
									<TableCell className="hidden md:table-cell">
										{
											// @ts-ignore
											customer.orders.length
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
												{/* <CustomerModal id={customer.id} initialData={{ email: customer.email, image: customer.image ?? "" }} /> */}
												<DropdownMenuItem>
													<form
														action={async () => {
															await deleteUser(customer.id);
														}}
														className="w-full text-center"
													>
														<Button type="submit" variant={"destructive"}>
															حذف
														</Button>
													</form>
												</DropdownMenuItem>
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
							{customersData.customers.length > 0 ? "1" : "0"}-
							{customersData.customers.length}
						</strong>{" "}
						من <strong>{customersData.totalCustomers}</strong>
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
