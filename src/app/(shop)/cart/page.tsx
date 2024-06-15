import { Heading } from "@/components/ui/heading";
import Cart from "./cart";

export const metadata = {
	title: "كنان الورد: سلة التسوق",
	description:
		"استعرض المنتجات المضافة إلى سلة التسوق الخاصة بك في كنان الورد.",
};

export default function page() {
	return (
		<div className="space-y-5">
			<Heading title="السلة" description="سلة المنتجات التي قمت باضافتها" />
			<Cart />
		</div>
	);
}
