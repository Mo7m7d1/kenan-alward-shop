import { Button } from "../ui/button";
import { ShoppingCart } from "lucide-react";
import { Link } from "next-view-transitions";
import { Product } from "@prisma/client";
import { formatMoney } from "@/lib/utils";
import { Badge } from "../ui/badge";

export default function ProductCard({
	id,
	title,
	price,
	images,
	stock,
}: Product) {
	return (
		<Link href={`/${String(id)}`}>
			<div className="ml-3 w-full overflow-hidden rounded-lg border shadow-lg transition-all duration-200 hover:scale-[102%] dark:border-slate-800">
				<img
					alt="Product photo"
					className="h-52 w-full object-cover md:h-64"
					height={300}
					src={images[0] ?? "/images/placeholder.svg"}
					style={{
						aspectRatio: "400/300",
						objectFit: "cover",
					}}
					width={400}
					loading="lazy"
				/>
				<div className="p-4">
					<h3 className="mb-2 text-lg font-semibold">{title}</h3>
					<p className="mb-4 text-gray-500 dark:text-gray-400">
						{formatMoney(price)}
					</p>
					<div className="flex w-full justify-end">
						{stock === 0 ? (
							<Badge className="p-2">انتهت الكمية</Badge>
						) : (
							<Button size="icon">
								<ShoppingCart />
							</Button>
						)}
					</div>
				</div>
			</div>
		</Link>
	);
}
