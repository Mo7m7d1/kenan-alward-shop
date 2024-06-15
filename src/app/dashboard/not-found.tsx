import { buttonVariants } from "@/components/ui/button";
import { Link } from "next-view-transitions";

export default function NotFound() {
	return (
		<div className="flex flex-col gap-5 justify-center items-center mt-32">
			<h2 className="text-lg text-red-500 font-semibold">الصفحة غير موجودة</h2>
			<Link
				className={buttonVariants({ variant: "default" })}
				href="/dashboard"
			>
				العودة إلى الصفحة الرئيسية
			</Link>
		</div>
	);
}
