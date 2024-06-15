import ProductsCarousel from "./products-carousel";
import { Skeleton } from "../ui/skeleton";
import { getProducts } from "@/server/models/product";

export default async function HomeCarousel() {
	const products = await getProducts({});
	return (
		<div className="space-y-7" id="products">
			<h2 className="text-center text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
				المنتجات المميزة
			</h2>
			<ProductsCarousel products={products!} />
		</div>
	);
}

export function HomeCarouselSkeleton() {
	return (
		<div className="mt-0 w-full pt-0">
			<div className="flex gap-3">
				{Array.from({ length: 3 }).map((_, index) => (
					<div
						key={index}
						className="flex h-52 w-full basis-1/2 flex-col space-y-3 rounded-lg shadow md:h-80 md:basis-1/3"
					>
						<Skeleton className="h-32 w-full rounded-lg object-cover md:h-52" />
						<div className="space-y-2 p-2">
							<Skeleton className="h-4 w-[160px]" />
							<Skeleton className="h-4 w-[100px]" />
						</div>
					</div>
				))}
			</div>
		</div>
	);
}
