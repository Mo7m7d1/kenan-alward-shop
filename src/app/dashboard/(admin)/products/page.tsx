import { File, ListFilter, MoreHorizontal, PlusCircle } from "lucide-react";
import { Button, buttonVariants } from "@/components/ui/button";
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
import { formatDateArabic, formatMoney } from "@/lib/utils";
import { Link } from "next-view-transitions";
import { Badge } from "@/components/ui/badge";
import { deleteProduct, getProducts } from "@/server/models/product";
import { revalidatePath } from "next/cache";

export default async function page() {
	const products = await getProducts({});
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
			<Card dir="rtl" className="w-full">
				<CardHeader>
					<CardTitle>المنتجات</CardTitle>
					<CardDescription>
						إدارة المنتجات الخاصة بك ومشاهدة أدائها.
					</CardDescription>
				</CardHeader>
				<CardContent>
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
							{products?.map((product) => (
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
									<TableCell>{product.totalSales ?? 0}</TableCell>
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
															"use server";
															await deleteProduct(product.id);
															revalidatePath("/dashboard/products");
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
							{products?.length ?? 0 > 0 ? "1" : "0"}-{products?.length}
						</strong>{" "}
						من <strong>{products?.length}</strong> منتج
					</div>
				</CardFooter>
			</Card>
		</main>
	);
}
