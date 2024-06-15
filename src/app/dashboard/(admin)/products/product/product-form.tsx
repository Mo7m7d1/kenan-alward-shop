"use client";

import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import {
	Form,
	FormControl,
	FormDescription,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from "@/components/ui/form";
import { Heading } from "@/components/ui/heading";
import ImageUpload from "@/components/ui/image-upload";
import { Input } from "@/components/ui/input";
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "@/components/ui/select";
import { Separator } from "@/components/ui/separator";
import {
	createProduct,
	deleteProduct,
	updateProduct,
} from "@/server/models/product";
import { zodResolver } from "@hookform/resolvers/zod";
import { Category, Product } from "@prisma/client";
import { Trash } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import * as z from "zod";

const formSchema = z.object({
	title: z.string().min(1),
	images: z.object({ url: z.string() }).array(),
	price: z.coerce.number().min(1),
	discount: z.coerce.number().min(0),
	stock: z.coerce.number().min(0),
	categoryId: z.string().min(1, "القسم مطلوب"),
	isFeatured: z.boolean().default(false).optional(),
	isAvailable: z.boolean().default(false).optional(),
});

export type ProductSchema = z.infer<typeof formSchema>;

type ProductFormValues = z.infer<typeof formSchema>;

interface ProductFormProps {
	initialData: Partial<
		Product & { images: { url: string }[]; category: Category }
	>;
	categories: Category[];
}

export const ProductForm: React.FC<ProductFormProps> = ({
	initialData,
	categories,
}) => {
	const router = useRouter();

	const [open, setOpen] = useState(false);
	const [loading, setLoading] = useState(false);

	const title = initialData ? "تعديل المنتج" : "إنشاء منتج جديد";
	const description = initialData ? "تعديل منتج." : "إضافة منتج جديد";
	const toastMessage = initialData ? "تم تحديث المنتج." : "تم إنشاء المنتج.";
	const action = initialData ? "حفظ التغييرات" : "إنشاء";

	const defaultValues: ProductFormValues = initialData
		? {
				title: initialData.title || "",
				images: initialData.images?.map((x) => ({ url: x })) || [],
				price: initialData.price || 0,
				discount: initialData.discount || 0,
				stock: initialData.stock || 0,
				// @ts-ignore
				categoryId: initialData.categories[0].id || "",
				isFeatured: initialData.isFeatured || false,
				isAvailable: initialData.isAvailable || false,
		  }
		: {
				title: "",
				images: [],
				price: 0,
				discount: 0,
				stock: 0,
				categoryId: "",
				isFeatured: false,
				isAvailable: false,
		  };

	const form = useForm<ProductFormValues>({
		resolver: zodResolver(formSchema),
		defaultValues,
	});

	const onSubmit = async (values: ProductFormValues) => {
		try {
			setLoading(true);

			const payload = {
				...values,
				images: { set: values.images.map((x) => x.url) },
				categories: { connect: { id: values.categoryId } },
				categoryId: undefined,
			};

			const res = initialData
				? await updateProduct(initialData.id!, payload)
				: await createProduct(payload);

			router.push(`/dashboard/products`);
			toast.success(toastMessage);
		} catch (error: any) {
			console.error(error);
			toast.error("حدث خطأ ما.");
		} finally {
			setLoading(false);
		}
	};

	const onDelete = async () => {
		try {
			setLoading(true);

			await deleteProduct(initialData.id!);
			toast.success("تم حذف المنتج.");
			router.push(`/dashboard/products`);
		} catch (error: any) {
			toast.error("حدث خطأ ما.");
		} finally {
			setLoading(false);
			setOpen(false);
		}
	};

	return (
		<>
			<div className="flex items-center justify-between">
				<Heading title={title} description={description} />
				{initialData && (
					<Button
						disabled={loading}
						variant="destructive"
						size="sm"
						onClick={onDelete}
					>
						<Trash className="h-4" />
					</Button>
				)}
			</div>
			<Separator />
			<Form {...form}>
				<form
					onSubmit={form.handleSubmit(onSubmit)}
					className="w-full space-y-8"
				>
					<FormField
						control={form.control}
						name="images"
						render={({ field }) => (
							<FormItem>
								<FormLabel>الصور</FormLabel>
								<FormControl>
									<ImageUpload
										value={field.value.map((x) => x.url)}
										disabled={loading}
										onChange={(url) =>
											field.onChange([...field.value, { url }])
										}
										onRemove={(url) =>
											field.onChange([
												...field.value.filter((current) => current.url !== url),
											])
										}
									/>
								</FormControl>
								<FormMessage />
							</FormItem>
						)}
					/>
					<div className="gap-8 md:grid md:grid-cols-3">
						<FormField
							control={form.control}
							name="title"
							render={({ field }) => (
								<FormItem>
									<FormLabel>الاسم</FormLabel>
									<FormControl>
										<Input
											disabled={loading}
											placeholder="عنوان المنتج"
											{...field}
										/>
									</FormControl>
									<FormMessage />
								</FormItem>
							)}
						/>
						<FormField
							control={form.control}
							name="price"
							render={({ field }) => (
								<FormItem>
									<FormLabel>السعر</FormLabel>
									<FormControl>
										<Input
											type="number"
											disabled={loading}
											placeholder="9.99"
											{...field}
										/>
									</FormControl>
									<FormMessage />
								</FormItem>
							)}
						/>
						<FormField
							control={form.control}
							name="discount"
							render={({ field }) => (
								<FormItem>
									<FormLabel>الخصم</FormLabel>
									<FormControl>
										<Input
											type="number"
											disabled={loading}
											placeholder="9.99"
											{...field}
										/>
									</FormControl>
									<FormMessage />
								</FormItem>
							)}
						/>
						<FormField
							control={form.control}
							name="stock"
							render={({ field }) => (
								<FormItem>
									<FormLabel>المخزون</FormLabel>
									<FormControl>
										<Input
											type="number"
											disabled={loading}
											placeholder="10"
											{...field}
										/>
									</FormControl>
									<FormMessage />
								</FormItem>
							)}
						/>
						<FormField
							control={form.control}
							name="categoryId"
							render={({ field }) => (
								<FormItem>
									<FormLabel>القسم</FormLabel>
									<Select
										disabled={loading}
										onValueChange={field.onChange}
										value={field.value}
										defaultValue={field.value}
										dir="rtl"
									>
										<FormControl>
											<SelectTrigger>
												<SelectValue
													defaultValue={field.value}
													placeholder="اختر قسم"
												/>
											</SelectTrigger>
										</FormControl>
										<SelectContent>
											{categories.map((category) => (
												<SelectItem key={category.id} value={category.id}>
													{category.title}
												</SelectItem>
											))}
										</SelectContent>
									</Select>
									<FormMessage />
								</FormItem>
							)}
						/>
						<FormField
							control={form.control}
							name="isFeatured"
							render={({ field }) => (
								<FormItem className="mb-3 mt-3 flex flex-row items-start gap-3 space-y-0 rounded-md border p-4">
									<FormControl>
										<Checkbox
											checked={field.value}
											onCheckedChange={field.onChange}
										/>
									</FormControl>
									<div className="space-y-1 leading-none">
										<FormLabel>مميز</FormLabel>
										<FormDescription>
											سيظهر هذا المنتج على الصفحة الرئيسية
										</FormDescription>
									</div>
								</FormItem>
							)}
						/>
						<FormField
							control={form.control}
							name="isAvailable"
							render={({ field }) => (
								<FormItem className="flex flex-row items-start gap-3 space-y-0 rounded-md border p-4">
									<FormControl>
										<Checkbox
											checked={field.value}
											onCheckedChange={field.onChange}
										/>
									</FormControl>
									<div className="space-y-1 leading-none">
										<FormLabel>متوفر</FormLabel>
										<FormDescription>
											سيظهر هذا المنتج في المتجر.
										</FormDescription>
									</div>
								</FormItem>
							)}
						/>
					</div>
					<Button disabled={loading} className="ml-auto" type="submit">
						{action}
					</Button>
				</form>
			</Form>
		</>
	);
};
