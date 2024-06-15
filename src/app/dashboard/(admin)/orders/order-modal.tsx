"use client";

import { Button } from "@/components/ui/button";
import {
	Dialog,
	DialogContent,
	DialogHeader,
	DialogTitle,
	DialogTrigger,
} from "@/components/ui/dialog";
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "@/components/ui/select";
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
import { createOrder, updateOrder } from "@/server/models/order";
import { Prisma, OrderStatusEnum } from "@prisma/client";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";

const orderStatus = {
	Processing: "جاري المعالجة",
	Shipped: "تم الشحن",
	Delivered: "تم التوصيل",
	Cancelled: "ملغي",
};

const zOrder = z.object({
	status: z.nativeEnum(OrderStatusEnum, { required_error: "الحالة مطلوبة" }),
	isPaid: z.coerce.boolean({ required_error: "حالة الدفع مطلوبة" }),
});

type OrderSchema = z.infer<typeof zOrder>;

export function OrderModal({
	id,
	initialData,
}: {
	id: string;
	initialData?: Partial<OrderSchema>;
}) {
	const form = useForm<OrderSchema>({
		resolver: zodResolver(zOrder),
		defaultValues: initialData,
	});

	const onSubmit = async (values: OrderSchema) => {
		try {
			await updateOrder(id, values);

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
				<Button size={"sm"}>تعديل الطلب</Button>
			</DialogTrigger>
			<DialogContent className="sm:max-w-[425px]">
				<DialogHeader>
					<DialogTitle className="text-center">تعديل حالة الطلب</DialogTitle>
				</DialogHeader>
				<Form {...form}>
					<form onSubmit={form.handleSubmit(onSubmit)} className="space-y-5">
						<FormField
							control={form.control}
							name="status"
							render={({ field }) => (
								<FormItem>
									<FormLabel>حالة الطلب</FormLabel>
									<Select
										dir="rtl"
										onValueChange={field.onChange}
										defaultValue={field.value}
									>
										<FormControl>
											<SelectTrigger>
												<SelectValue placeholder="اختر حالة الطلب" />
											</SelectTrigger>
										</FormControl>
										<SelectContent>
											{Object.entries(orderStatus).map(([key, value]) => (
												<SelectItem key={key} value={key}>
													{value}
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
							name="isPaid"
							render={({ field }) => (
								<FormItem className="flex flex-row items-start space-x-3 space-y-0 rounded-md border p-4">
									<FormControl>
										<Checkbox
											dir="rtl"
											checked={field.value}
											onCheckedChange={field.onChange}
											className="ml-2"
										/>
									</FormControl>
									<div className="space-y-1 leading-none">
										<FormLabel>مدفوع</FormLabel>
									</div>
								</FormItem>
							)}
						/>

						<Button type="submit">
							{form.formState.isSubmitting ? <LoadingSpinner /> : "تعديل"}
						</Button>
					</form>
				</Form>
			</DialogContent>
		</Dialog>
	);
}
