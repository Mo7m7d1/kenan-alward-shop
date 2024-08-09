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
import { formatDateArabic, formatMoney } from "@/lib/utils";
import { Badge } from "@/components/ui/badge";
import { useEffect, useState } from "react";
import { deleteProduct, getPaginatedProducts } from "@/server/models/product";
import LoadingSpinner from "@/components/shared/loading-spinner";
import { Product } from "@prisma/client";
import { buttonVariants } from "@/components/ui/button";
import { Link } from "next-view-transitions";

export default function ProductsTable() {
	const [page, setPage] = useState(1);
	const [productsData, setProductsData] = useState<{
		products: Product[];
		totalProducts: number;
	}>({
		products: [],
		totalProducts: 0,
	});
	const [loading, setLoading] = useState(true);

	const fetchProducts = async (page: number) => {
		setLoading(true);
		const { p: products, totalProducts } = await getPaginatedProducts(page, 10);
		setProductsData({ products, totalProducts });
		setLoading(false);
	};

	useEffect(() => {
		fetchProducts(page);
	}, [page]);

	const totalPages = Math.ceil(productsData.totalProducts / 10);

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
								<TableHead className="text-right">الصورة</TableHead>
								<TableHead className="text-right">الاسم</TableHead>
								<TableHead className="text-right">الحالة</TableHead>
								<TableHead className="text-right">السعر</TableHead>
								<TableHead className="text-right">إجمالي المبيعات</TableHead>
								<TableHead className="text-right">الكمية</TableHead>
								<TableHead className="hidden text-right md:table-cell">
									تم الإنشاء في
								</TableHead>
								<TableHead>
									<span className="sr-only">إجراءات</span>
								</TableHead>
							</TableRow>
						</TableHeader>
						<TableBody>
							{productsData.products.map((product) => (
								<TableRow key={product.id}>
									<TableCell className="font-medium">
										<a
											href={product.images[0] ?? "/images/placeholder.svg"}
											target="_blank"
										>
											<img
												src={product.images[0] || "/images/placeholder.svg"}
												alt={product.title}
												width={50}
												height={50}
												className="rounded"
											/>
										</a>
									</TableCell>
									<TableCell>{product.title}</TableCell>
									<TableCell>
										<Badge
											variant={product.stock > 0 ? "default" : "destructive"}
										>
											{product.stock > 0 ? "متوفر" : "غير متوفر"}
										</Badge>
									</TableCell>
									<TableCell>{formatMoney(product.price)}</TableCell>
									<TableCell>
										{
											// @ts-ignore
											product.totalSales ?? 0
										}
									</TableCell>
									<TableCell>{product.stock ?? 0}</TableCell>
									<TableCell className="hidden md:table-cell">
										{formatDateArabic(
											new Date(product.createdAt).toISOString()
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
												<Link
													className={buttonVariants({ size: "sm" })}
													href={`/dashboard/products/product?id=${product.id}`}
												>
													تعديل
												</Link>
												<DropdownMenuItem>
													<form
														action={async () => {
															await deleteProduct(product.id);
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
							{productsData.products.length > 0 ? "1" : "0"}-
							{productsData.products.length}
						</strong>{" "}
						من <strong>{productsData.totalProducts}</strong>
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
