"use client";

import { useState, ChangeEvent, FormEvent } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { EyeIcon, EyeOffIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import LoadingSpinner from "@/components/shared/loading-spinner";
import z from "zod";
import { login } from "@/server/models/user";
import { Label } from "@/components/ui/label";

export const zLoginSchema = z.object({
	email: z.string().email("الإيميل غير صحيح"),
	password: z.string().min(1, "كلمة المرور مطلوبة"),
});

export type LoginSchema = z.infer<typeof zLoginSchema>;

export default function LoginForm() {
	const [showPassword, setShowPassword] = useState(false);
	const [formState, setFormState] = useState<LoginSchema>({
		email: "",
		password: "",
	});
	const [errors, setErrors] = useState<Partial<LoginSchema>>({});
	const [isSubmitting, setIsSubmitting] = useState(false);
	const router = useRouter();

	const validate = (): boolean => {
		const result = zLoginSchema.safeParse(formState);
		if (!result.success) {
			const newErrors = result.error.errors.reduce((acc, error) => {
				acc[error.path[0] as keyof LoginSchema] = error.message;
				return acc;
			}, {} as Partial<LoginSchema>);
			setErrors(newErrors);
			return false;
		}
		setErrors({});
		return true;
	};

	const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
		const { id, value } = e.target;
		setFormState((prev) => ({ ...prev, [id]: value }));
		setErrors((prev) => ({ ...prev, [id]: "" })); // Clear the error for the field being typed in
	};

	const handleSubmit = async (e: FormEvent) => {
		e.preventDefault();
		if (!validate()) return;

		setIsSubmitting(true);
		try {
			const res = await login(formState);
			if (res.error) {
				toast.error(res.error);
			} else {
				router.push("/dashboard");
			}
		} catch (error) {
			toast.error("حدث خطأ ما");
			console.error(error);
		} finally {
			setIsSubmitting(false);
		}
	};

	return (
		<form onSubmit={handleSubmit} className="space-y-8">
			<div>
				<Label htmlFor="email">الإيميل</Label>
				<div>
					<Input
						id="email"
						type="text"
						placeholder="مثال: احمد.."
						value={formState.email}
						onChange={handleChange}
					/>
					{errors.email && (
						<span className="text-red-500 text-sm mt-1">{errors.email}</span>
					)}
				</div>
			</div>
			<div className="w-full">
				<Label htmlFor="password">كلمة المرور</Label>
				<div className="relative">
					<Input
						id="password"
						type={showPassword ? "text" : "password"}
						placeholder="****"
						value={formState.password}
						onChange={handleChange}
					/>
					<span
						className="absolute inset-y-0 left-2 pr-3 flex items-center cursor-pointer"
						onClick={() => setShowPassword(!showPassword)}
					>
						{showPassword ? (
							<EyeOffIcon className="h-5 w-5 text-gray-400" />
						) : (
							<EyeIcon className="h-5 w-5 text-gray-400" />
						)}
					</span>
					{errors.password && (
						<span className="text-red-500 text-sm mt-1">{errors.password}</span>
					)}
				</div>
			</div>
			<Button type="submit">
				{isSubmitting ? <LoadingSpinner /> : "تسجيل الدخول"}
			</Button>
		</form>
	);
}
