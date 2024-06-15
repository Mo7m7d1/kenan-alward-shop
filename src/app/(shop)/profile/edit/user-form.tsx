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
import { Input } from "@/components/ui/input";
import { updateUser } from "@/server/models/user";
import { zodResolver } from "@hookform/resolvers/zod";
import { User } from "@prisma/client";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import * as z from "zod";

const formSchema = z.object({
	name: z.string().min(1),
	email: z.string().optional(),
	phone: z
		.string()
		.regex(/^(?:\+966|0)?5\d{8}$/, {
			message: "الرقم غير صحيح 000 000 500 966+  ",
		})
		.or(z.string().optional()),
});

type UserFormValues = z.infer<typeof formSchema>;

interface UserFormProps {
	initialData: User | null | undefined;
}

export const UserForm: React.FC<UserFormProps> = ({ initialData }) => {
	const router = useRouter();
	const [loading, setLoading] = useState(false);

	const toastMessage = "تم تحديث بيانات حسابك.";
	const action = "حفظ التغييرات";

	const defaultValues = initialData
		? {
				...initialData,
		  }
		: {
				name: "",
				phone: "",
				email: "",
		  };

	const form = useForm<UserFormValues>({
		resolver: zodResolver(formSchema),
		defaultValues: {
			email: defaultValues.email ?? "",
			name: defaultValues.name ?? "",
			phone: defaultValues.phone ?? "",
		},
	});

	const onSubmit = async (data: UserFormValues) => {
		try {
			setLoading(true);

			await updateUser(initialData?.id!, data);

			router.push(`/`);
			toast.success(toastMessage);
		} catch (error: any) {
			toast.error("حدث خطأ ما.");
		} finally {
			setLoading(false);
		}
	};

	return (
		<Form {...form}>
			<form onSubmit={form.handleSubmit(onSubmit)} className="space-y-2 w-full">
				<FormField
					control={form.control}
					name="name"
					render={({ field }) => (
						<FormItem>
							<FormLabel>الاسم</FormLabel>
							<FormControl>
								<Input
									disabled={loading}
									placeholder="الاسم الكامل"
									{...field}
								/>
							</FormControl>
							<FormMessage />
						</FormItem>
					)}
				/>
				<FormField
					control={form.control}
					name="email"
					render={({ field }) => (
						<FormItem>
							<FormLabel>البريد الإلكتروني</FormLabel>
							<FormControl>
								<Input
									type="text"
									disabled={loading}
									placeholder="البريد الإلكتروني"
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
									type="text"
									disabled={loading}
									placeholder="مثال: 000 000 500 966+  "
									{...field}
									className="mb-4"
								/>
							</FormControl>
							<FormMessage />
						</FormItem>
					)}
				/>
				<Button disabled={loading} type="submit" className="mt-2">
					{action}
				</Button>
			</form>
		</Form>
	);
};
