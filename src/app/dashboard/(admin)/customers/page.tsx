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
	DropdownMenuItem,
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
import { formatDateArabic } from "@/lib/utils";
import { deleteUser, getUsers } from "@/server/models/user";
import { revalidatePath } from "next/cache";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

export default async function page() {
	const customers = await getUsers();
	return (
		<main
			className="my-5 flex w-full  flex-col items-start gap-4 p-4 sm:px-6 sm:py-0"
			dir="rtl"
		>
			<div className="ml-auto flex  items-center gap-2">
				{/* <CustomerModal /> */}

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
					<CardTitle>العملاء</CardTitle>
					<CardDescription>إدارة العملاء في متجرك .</CardDescription>
				</CardHeader>
				<CardContent>
					<Table>
						<TableHeader>
							<TableRow>
								<TableHead className="text-right">#</TableHead>
								{/* <TableHead className="text-right">الاسم </TableHead> */}
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
							{customers?.map((customer, i) => (
								<TableRow key={customer.id}>
									<TableCell className="font-medium">{i + 1}</TableCell>
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
										{customer.orders.length}
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
												{/* <CustomerModal
													id={customer.id}
													initialData={{
														title: customer.title,
														description: customer.description ?? "",
													}}
												/> */}
												{/* <DropdownMenuItem>
													<form
														action={async () => {
															"use server";
															await deleteUser(customer.id);
															revalidatePath("/dashboard/customers");
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
							{customers?.length ?? 0 > 0 ? "1" : "0"}-{customers?.length}
						</strong>{" "}
						من <strong>{customers?.length}</strong>
					</div>
				</CardFooter>
			</Card>
		</main>
	);
}
