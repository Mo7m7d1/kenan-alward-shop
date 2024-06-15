import ProductCard from "@/components/shared/product-card";
import { formatMoney } from "@/lib/utils";
import CartButton from "./components/cart-button";
import { getProduct, getProducts } from "@/server/models/product";
import { notFound } from "next/navigation";
import { Badge } from "@/components/ui/badge";

export default async function page({ params }: any) {
	if (!params.product) return notFound();

	const product = await getProduct(params.product);
	if (!product) return notFound();

	const similarProducts = await getProducts({
		category: product?.categories[0].id,
		take: 3,
	});
	return (
		<>
			<div className="mx-auto grid max-w-6xl items-start gap-6 px-4 py-6 md:grid-cols-2 lg:gap-12">
				<div className="grid items-start gap-3 md:grid-cols-5">
					<div className="md:col-span-4">
						<img
							alt="Product Image"
							className=" mb-4 h-[300px] w-full overflow-hidden rounded-lg border border-gray-200 object-cover dark:border-gray-800 md:mb-0"
							height={900}
							src={product?.images[0] ?? "/images/placeholder.svg"}
							width={600}
						/>
					</div>
					<div className="flex items-start md:hidden">
						<div className="grid gap-4">
							<h1 className="text-2xl font-bold sm:text-3xl">
								{product?.title}
							</h1>
							<div>
								<p>{product?.description}</p>
							</div>
							<div className="flex items-center gap-4">
								<div className="flex items-center gap-0.5">
									<StarIcon className="h-5 w-5 fill-primary" />
									<StarIcon className="h-5 w-5 fill-primary" />
									<StarIcon className="h-5 w-5 fill-primary" />
									<StarIcon className="h-5 w-5 fill-muted stroke-muted-foreground" />
									<StarIcon className="h-5 w-5 fill-muted stroke-muted-foreground" />
								</div>
								<div className="text-4xl font-bold">
									{formatMoney(product?.price ?? 0)}
								</div>
							</div>
						</div>
					</div>
				</div>
				<div className="grid items-start gap-4 md:gap-10">
					<div className="hidden items-start md:flex">
						<div className="grid gap-4">
							<h1 className="text-3xl font-bold lg:text-4xl">
								{product?.title}
							</h1>
							<div>
								<p>{product?.description}</p>
							</div>
							<div className="flex items-center gap-4">
								<div className="flex items-center gap-0.5">
									<StarIcon className="h-5 w-5 fill-primary" />
									<StarIcon className="h-5 w-5 fill-primary" />
									<StarIcon className="h-5 w-5 fill-primary" />
									<StarIcon className="h-5 w-5 fill-muted stroke-muted-foreground" />
									<StarIcon className="h-5 w-5 fill-muted stroke-muted-foreground" />
								</div>
								<div className="text-4xl font-bold">
									{formatMoney(product?.price ?? 0)}
								</div>
							</div>
						</div>
					</div>
					<div className="flex justify-start">
						{product.stock === 0 ? (
							<Badge className="p-2">انتهت الكمية</Badge>
						) : (
							<CartButton productId={product?.id!} stock={product?.stock} />
						)}
					</div>
				</div>
			</div>
			<h1 className="mb-5 mt-20 text-center text-3xl font-bold">
				منتجات قد تعجبك
			</h1>
			<section className="grid grid-cols-1 gap-6 p-4 md:grid-cols-2 md:p-6 lg:grid-cols-3">
				{similarProducts?.map((p, i) => (
					<ProductCard key={i} {...p} />
				))}
			</section>
		</>
	);
}

function StarIcon(props: any) {
	return (
		<svg
			{...props}
			xmlns="http://www.w3.org/2000/svg"
			width="24"
			height="24"
			viewBox="0 0 24 24"
			fill="none"
			stroke="currentColor"
			strokeWidth="2"
			strokeLinecap="round"
			strokeLinejoin="round"
		>
			<polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
		</svg>
	);
}
