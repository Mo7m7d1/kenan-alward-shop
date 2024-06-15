"use client";

import { Button } from "@/components/ui/button";
import {
	Dialog,
	DialogContent,
	DialogHeader,
	DialogTitle,
	DialogTrigger,
} from "@/components/ui/dialog";
import { useState, useEffect } from "react";
import { Input } from "@/components/ui/input";
import { delay } from "@/lib/utils";
import { User } from "@prisma/client";
import { EyeIcon, EyeOffIcon } from "lucide-react";

import { getAdmin, getUser, updateUser } from "@/server/models/user";
import { toast } from "sonner";
import LoadingSpinner from "@/components/shared/loading-spinner";

export default function ManageUserAccount() {
	const [user, setUser] = useState<User>();
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [isSubmitting, setIsSubmitting] = useState(false);
	const [showPassword, setShowPassword] = useState(false); // State to manage password visibility

	const onSubmit = async (event: React.FormEvent) => {
		event.preventDefault();
		setIsSubmitting(true);
		await delay(800);

		try {
			const res = await updateUser(user?.id!, {
				email: email || user?.email,
				password: password || user?.password,
			});

			if (res.error) {
				toast.error(res.error);
				setIsSubmitting(false);
				return;
			}

			setEmail("");
			setPassword("");
			toast.success("تم التعديل بنجاح");
		} catch (error) {
			toast.error("حدث خطا ما");
			console.log({ error });
		} finally {
			setIsSubmitting(false);
		}
	};

	useEffect(() => {
		const fetchUser = async () => {
			const res = await getAdmin();
			if (!res?.success) return;

			setUser(res.user!);
			setEmail(res.user?.email!);
		};

		fetchUser();
	}, []);

	return (
		<Dialog>
			<DialogTrigger asChild>
				<Button variant={"ghost"} size={"sm"}>
					إدارة الحساب
				</Button>
			</DialogTrigger>
			<DialogContent className="sm:max-w-[625px]">
				<DialogHeader>
					<DialogTitle className="text-center">إدارة الحساب</DialogTitle>
				</DialogHeader>
				<form onSubmit={onSubmit} className="space-y-5">
					<p className="pt-4">بيانات الحساب</p>
					<div className="flex gap-3">
						<div className="w-full">
							<label className="block text-sm font-medium text-gray-700">
								الإيميل
							</label>
							<Input value={email} onChange={(e) => setEmail(e.target.value)} />
						</div>
						<div className="w-full">
							<label className="block text-sm font-medium text-gray-700">
								كلمة المرور
							</label>
							<div className="relative">
								<Input
									type={showPassword ? "text" : "password"}
									placeholder="****"
									value={password}
									onChange={(e) => setPassword(e.target.value)}
								/>
								<span
									className="absolute inset-y-0 left-2 pr-3 flex items-center cursor-pointer"
									onClick={() => setShowPassword(!showPassword)} // Toggle password visibility
								>
									{showPassword ? (
										<EyeOffIcon className="h-5 w-5 text-gray-400" />
									) : (
										<EyeIcon className="h-5 w-5 text-gray-400" />
									)}
								</span>
							</div>
						</div>
					</div>

					<Button type="submit">
						{isSubmitting ? <LoadingSpinner /> : "تعديل"}
					</Button>
				</form>
			</DialogContent>
		</Dialog>
	);
}
