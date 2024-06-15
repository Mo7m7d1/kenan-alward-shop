"use client";

import { useState, ChangeEvent, FormEvent, useEffect } from "react";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import z from "zod";
import { checkout } from "@/server/models/checkout";
import { clearLocalCart, getLocalCart } from "@/lib/cart";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import LoadingSpinner from "@/components/shared/loading-spinner";
import { Label } from "@/components/ui/label";
import { useCart } from "@/components/shared/cart-context";
import { Address } from "@prisma/client";
import { getAddresses } from "@/server/models/adress";

export const zCheckoutSchema = z.object({
	address: z.string().min(1, "العنوان مطلوب"),
	paymentType: z.string().min(1, "نوع الدفع مطلوب"),
});

export type CheckoutSchema = z.infer<typeof zCheckoutSchema>;

export default function CheckoutForm() {
	const [addresses, setAddresses] = useState<Address[]>([]);
	const [formState, setFormState] = useState<CheckoutSchema>({
		address: "",
		paymentType: "",
	});
	const [errors, setErrors] = useState<Partial<CheckoutSchema>>({});
	const [isSubmitting, setIsSubmitting] = useState(false);
	const router = useRouter();
	const { clearCart } = useCart();

	const validate = (): boolean => {
		const result = zCheckoutSchema.safeParse(formState);
		if (!result.success) {
			const newErrors = result.error.errors.reduce((acc, error) => {
				acc[error.path[0] as keyof CheckoutSchema] = error.message;
				return acc;
			}, {} as Partial<CheckoutSchema>);
			setErrors(newErrors);
			return false;
		}
		setErrors({});
		return true;
	};

	const handleChange = (
		e: ChangeEvent<HTMLInputElement | HTMLSelectElement>
	) => {
		const { id, value } = e.target;
		setFormState((prev) => ({ ...prev, [id]: value }));
		setErrors((prev) => ({ ...prev, [id]: "" })); // Clear the error for the field being typed in
	};

	const handleSubmit = async (e: FormEvent) => {
		e.preventDefault();
		if (!validate()) return;

		setIsSubmitting(true);
		try {
			const response = await checkout({
				address: formState.address,
				paymentType: formState.paymentType,
				products: getLocalCart()!,
			});

			if (response.success) {
				clearCart();
				clearLocalCart();
				toast.success("تمت عملية الشراء بنجاح");
				router.push("/"); // Redirect to confirmation page
			} else {
				toast.error("حصل خطأ! " + response.error);
			}
		} catch (error) {
			toast.error("حدث خطأ ما");
			console.error(error);
		} finally {
			setIsSubmitting(false);
		}
	};

	useEffect(() => {
		const fetchAddresses = async () => {
			const res = await getAddresses();
			if (res) setAddresses(res);
		};
		fetchAddresses();
	}, []);

	return (
		<form onSubmit={handleSubmit} className="space-y-8">
			<div className="mb-4">
				<label
					htmlFor="address"
					className="block text-sm font-medium text-gray-700 text-right"
				>
					العنوان
				</label>
				<select
					id="address"
					name="address"
					onChange={handleChange}
					value={formState.address}
					className="mt-1 block w-full py-2 px-3 border  rounded-md shadow-sm focus:outline-none focus:ring-primary focus:border-primary sm:text-sm text-right"
				>
					{addresses?.map((address) => (
						<option
							key={address.id}
							value={address.id}
							className="p-1.5 border"
						>
							{address.address}
						</option>
					))}
				</select>
				{errors.address && (
					<span className="text-red-500 text-sm mt-1">{errors.address}</span>
				)}
			</div>
			<div>
				<Label htmlFor="paymentType">نوع الدفع</Label>
				<div>
					<select
						id="paymentType"
						value={formState.paymentType}
						onChange={handleChange}
						className="w-full p-2 border rounded-md shadow-sm focus:ring-orange-500 focus:border-orange-500"
					>
						<option className="p-1.5" value="" disabled>
							اختر نوع الدفع
						</option>
						<option className="p-1.5" value="Credit Card">
							بطاقة ائتمان
						</option>
						<option className="p-1.5" value="Paypal">
							باي بال
						</option>
					</select>
					{errors.paymentType && (
						<span className="text-red-500 text-sm mt-1">
							{errors.paymentType}
						</span>
					)}
				</div>
			</div>
			<Button type="submit" disabled={isSubmitting}>
				{isSubmitting ? <LoadingSpinner /> : "تأكيد الطلب"}
			</Button>
		</form>
	);
}
