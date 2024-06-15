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
import { CategoryModal } from "./category-modal";
import { formatDateArabic } from "@/lib/utils";
import { deleteCategory, getCategories } from "@/server/models/category";
import { revalidatePath } from "next/cache";

export default async function page() {
	const categories = await getCategories();
	return (
		<main
			className="my-5 flex w-full  flex-col items-start gap-4 p-4 sm:px-6 sm:py-0"
			dir="rtl"
		>
			<div className="ml-auto flex  items-center gap-2">
				<CategoryModal />

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
					<CardTitle>الأقسام</CardTitle>
					<CardDescription>
						إدارة الأقسام الخاصة بك ومشاهدة أدائها.
					</CardDescription>
				</CardHeader>
				<CardContent>
					<Table>
						<TableHeader>
							<TableRow>
								<TableHead className="text-right">الاسم</TableHead>
								<TableHead className="text-right">الوصف</TableHead>
								<TableHead className="hidden text-right md:table-cell">
									عدد المنتجات
								</TableHead>
								<TableHead className="hidden text-right md:table-cell">
									تم الإنشاء في
								</TableHead>
								<TableHead>
									<span className="sr-only">إجراءات</span>
								</TableHead>
							</TableRow>
						</TableHeader>
						<TableBody>
							{categories?.map((category) => (
								<TableRow key={category.id}>
									<TableCell className="font-medium">
										{category.title}
									</TableCell>
									<TableCell>{category.description}</TableCell>
									<TableCell className="hidden md:table-cell">
										{category.products.length}
									</TableCell>
									<TableCell className="hidden md:table-cell">
										{formatDateArabic(
											new Date(category.createdAt).toISOString()
										)}
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
												<CategoryModal
													id={category.id}
													initialData={{
														title: category.title,
														description: category.description ?? "",
													}}
												/>
												<DropdownMenuItem>
													<form
														action={async () => {
															"use server";
															await deleteCategory(category.id);
															revalidatePath("/dashboard/categories");
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
				</CardContent>
				<CardFooter>
					<div className="text-xs text-muted-foreground">
						عرض{" "}
						<strong>
							{categories?.length ?? 0 > 0 ? "1" : "0"}-{categories?.length}
						</strong>{" "}
						من <strong>{categories?.length}</strong> قسم
					</div>
				</CardFooter>
			</Card>
		</main>
	);
}
