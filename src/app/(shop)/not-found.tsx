import { buttonVariants } from "@/components/ui/button";
import { Link } from "next-view-transitions";

export const metadata = {
	title: "كنان الورد: الصفحة غير موجودة",
	description:
		"مرحبًا بكم في كنان الورد، المتجر السعودي الرائد للهدايا وباقات الورود.",
};

export default function NotFound() {
	return (
		<div className="flex flex-col gap-5 justify-center items-center mt-32">
			<h2 className="text-lg text-red-500 font-semibold">الصفحة غير موجودة</h2>
			<Link className={buttonVariants({ variant: "default" })} href="/">
				العودة إلى الصفحة الرئيسية
			</Link>
		</div>
	);
}
