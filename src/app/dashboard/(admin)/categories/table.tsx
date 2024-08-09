"use client";

import { MoreHorizontal } from "lucide-react";
import { Button } from "@/components/ui/button";
import { CardContent, CardFooter } from "@/components/ui/card";
import {
	DropdownMenu,
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
import { CategoryModal } from "./category-modal";
import { formatDateArabic } from "@/lib/utils";
import {
	deleteCategory,
	getPaginatedCategories,
} from "@/server/models/category";
import { useEffect, useState } from "react";
import LoadingSpinner from "@/components/shared/loading-spinner";
import { Category } from "@prisma/client";

export default function CategoriesTable() {
	const [page, setPage] = useState(1);
	const [categoriesData, setCategoriesData] = useState<{
		categories: Category[];
		totalCategories: number;
	}>({
		categories: [],
		totalCategories: 0,
	});
	const [loading, setLoading] = useState(true);

	const fetchCategories = async (page: number) => {
		setLoading(true);
		const { categories, totalCategories } = await getPaginatedCategories(
			page,
			10
		);
		setCategoriesData({ categories, totalCategories });
		setLoading(false);
	};

	useEffect(() => {
		fetchCategories(page);
	}, [page]);

	const totalPages = Math.ceil(categoriesData.totalCategories / 10);

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
							{categoriesData.categories.map((category) => (
								<TableRow key={category.id}>
									<TableCell className="font-medium">
										{category.title}
									</TableCell>
									<TableCell>{category.description}</TableCell>
									<TableCell className="hidden md:table-cell">
										{
											// @ts-ignore
											category.products.length
										}
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
															await deleteCategory(category.id);
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
							{categoriesData.categories.length > 0 ? "1" : "0"}-
							{categoriesData.categories.length}
						</strong>{" "}
						من <strong>{categoriesData.totalCategories}</strong> قسم
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
