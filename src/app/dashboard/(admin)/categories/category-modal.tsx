"use client";

import { Button } from "@/components/ui/button";
import {
	Dialog,
	DialogContent,
	DialogHeader,
	DialogTitle,
	DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import z from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";
import {
	Form,
	FormControl,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from "@/components/ui/form";
import LoadingSpinner from "@/components/shared/loading-spinner";
import { createCategory, updateCategory } from "@/server/models/category";
import { Prisma } from "@prisma/client";

const zCategory = z.object({
	title: z.string({ message: "الاسم مطلوب " }),
	description: z.string().optional(),
});

type CategorySchema = z.infer<typeof zCategory>;

export function CategoryModal({
	id,
	initialData,
}: {
	id?: string;
	initialData?: Partial<CategorySchema>;
}) {
	const title = id ? "تعديل" : "إضافة";
	const form = useForm<CategorySchema>({
		resolver: zodResolver(zCategory),
		defaultValues: initialData,
	});

	const onSubmit = async (values: CategorySchema) => {
		try {
			const res = id
				? await updateCategory(id, values)
				: await createCategory(values);

			form.reset();
			toast.success("تم بنجاح");
		} catch (error) {
			toast.error("حدث خطا ما");
			console.log({ error });
		}
	};

	return (
		<Dialog>
			<DialogTrigger asChild>
				<Button size={"sm"}>{title}</Button>
			</DialogTrigger>
			<DialogContent className="sm:max-w-[425px]">
				<DialogHeader>
					<DialogTitle className="text-center">{title} قسم</DialogTitle>
				</DialogHeader>
				<Form {...form}>
					<form onSubmit={form.handleSubmit(onSubmit)} className="space-y-5">
						<FormField
							control={form.control}
							name="title"
							render={({ field }) => (
								<FormItem>
									<FormLabel>القسم</FormLabel>
									<FormControl>
										<Input placeholder="مثال: الورود" {...field} />
									</FormControl>
									<FormMessage />
								</FormItem>
							)}
						/>
						<FormField
							control={form.control}
							name="description"
							render={({ field }) => (
								<FormItem>
									<FormLabel>الوصف</FormLabel>
									<FormControl>
										<Input placeholder="وصف القسم..." {...field} />
									</FormControl>
									<FormMessage />
								</FormItem>
							)}
						/>

						<Button type="submit">
							{form.formState.isSubmitting ? <LoadingSpinner /> : title}
						</Button>
					</form>
				</Form>
			</DialogContent>
		</Dialog>
	);
}
