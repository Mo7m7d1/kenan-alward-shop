"use client";

import { Button } from "@/components/ui/button";
import {
	Form,
	FormControl,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from "@/components/ui/form";
import { Heading } from "@/components/ui/heading";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import { Textarea } from "@/components/ui/textarea";
import {
	createAddress,
	deleteAddress,
	updateAddress,
} from "@/server/models/adress";
import { zodResolver } from "@hookform/resolvers/zod";
import { Address } from "@prisma/client";
import { Trash } from "lucide-react";
import { useSession } from "next-auth/react";
import { useParams, useRouter } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import * as z from "zod";

const formSchema = z.object({
	city: z.string().min(1, "المدينة مطلوبو"),
	address: z.string().min(1, "الهاتف مطلوب"),
	postalCode: z.string().min(1, "رمز المدينة مطلوب"),
	phone: z.string().regex(/^(?:\+966|0)?5\d{8}$/, {
		message: "الرقم غير صحيح 000 000 500 966+  ",
	}),
});

type AddressFormValues = z.infer<typeof formSchema>;

interface AddressFormProps {
	initialData: Address | undefined;
}

export const AddressForm: React.FC<AddressFormProps> = ({ initialData }) => {
	const params = useParams();
	const router = useRouter();

	const [open, setOpen] = useState(false);
	const [loading, setLoading] = useState(false);
	const { data: session } = useSession();

	const title = initialData ? "تحرير العنوان" : "إنشاء عنوان جديد";
	const description = initialData ? "تحرير عنوان." : "إضافة عنوان جديد";
	const toastMessage = initialData ? "تم تحديث العنوان." : "تم إنشاء العنوان.";
	const action = initialData ? "حفظ التغييرات" : "إنشاء";

	const form = useForm<AddressFormValues>({
		resolver: zodResolver(formSchema),
		defaultValues: initialData || {
			phone: "",
			city: "",
			address: "",
			postalCode: "",
		},
	});

	const onSubmit = async (data: AddressFormValues) => {
		try {
			setLoading(true);

			const res = initialData
				? await updateAddress(initialData.id!, data)
				: await createAddress({
						city: data.city,
						address: data.address,
						phone: data.phone,
						postalCode: data.postalCode,
						user: { connect: { id: session?.user.id! } },
				  });

			router.refresh();
			router.push(`/profile/addresses`);
			toast.success(toastMessage);
		} catch (error: any) {
			toast.error("حدث خطأ ما.");
		} finally {
			setLoading(false);
		}
	};

	const onDelete = async () => {
		try {
			setLoading(true);

			await deleteAddress(initialData?.id!);

			router.refresh();
			router.push(`/profile/addresses`);
			toast.success("تم حذف العنوان.");
		} catch (error: any) {
			toast.error("حصل خطأ ما!");
		} finally {
			setLoading(false);
			setOpen(false);
		}
	};

	return (
		<>
			<div className="flex items-center justify-between pt-4">
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
					className="space-y-8 w-full"
				>
					<div className="flex flex-col gap-4">
						<FormField
							control={form.control}
							name="city"
							render={({ field }) => (
								<FormItem>
									<FormLabel>المدينة</FormLabel>
									<FormControl>
										<Input
											disabled={loading}
											placeholder="ادخل المدينة..."
											{...field}
										/>
									</FormControl>
									<FormMessage />
								</FormItem>
							)}
						/>

						<FormField
							control={form.control}
							name="phone"
							render={({ field }) => (
								<FormItem>
									<FormLabel>الهاتف</FormLabel>
									<FormControl>
										<Input
											disabled={loading}
											placeholder="مثال: 000 000 500 966+  "
											{...field}
										/>
									</FormControl>
									<FormMessage />
								</FormItem>
							)}
						/>
						<FormField
							control={form.control}
							name="postalCode"
							render={({ field }) => (
								<FormItem>
									<FormLabel>رمز المدينة</FormLabel>
									<FormControl>
										<Input
											disabled={loading}
											placeholder="رمز المدينة"
											{...field}
										/>
									</FormControl>
									<FormMessage />
								</FormItem>
							)}
						/>
						<div className="col-span-2">
							<FormField
								control={form.control}
								name="address"
								render={({ field }) => (
									<FormItem>
										<FormLabel>العنوان</FormLabel>
										<FormControl>
											<Textarea
												disabled={loading}
												placeholder="ادخل عنوانك الكامل"
												{...field}
											/>
										</FormControl>
										<FormMessage />
									</FormItem>
								)}
							/>
						</div>
					</div>

					<Button disabled={loading} className="ml-auto" type="submit">
						{action}
					</Button>
				</form>
			</Form>
		</>
	);
};
