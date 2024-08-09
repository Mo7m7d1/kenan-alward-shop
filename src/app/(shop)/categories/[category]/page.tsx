import ProductCard from "@/components/shared/product-card";
import { Skeleton } from "@/components/ui/skeleton";
import { getProducts } from "@/server/models/product";
import { notFound } from "next/navigation";
import { Suspense } from "react";

import { Metadata } from "next";

export async function generateMetadata({ params }: any): Promise<Metadata> {
	const category = params.category;

	if (!category) {
		return {
			title: "ألقسم غير موجود",
			description: "القسم غير موجود",
		};
	}

	return {
		title: `${category} - كنان الورد`,
		description: category,
	};
}

export default async function page({ params, searchParams }: any) {
	if (!params.category || !searchParams.categoryName) {
		return notFound();
	}
	return (
		<main className="space-y-10">
			<section className="flex items-center justify-between">
				<h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
					قسم {decodeURIComponent(searchParams.categoryName) ?? ""}
				</h2>
			</section>

			<Suspense key={params.category} fallback={<CategoryProductsSkeleton />}>
				<CategoryProducts category={params.category} />
			</Suspense>
		</main>
	);
}

async function CategoryProducts({ category }: { category: string }) {
	const products = await getProducts({ category });

	return (
		<section className="grid grid-cols-2 gap-3 md:grid-cols-3">
			{products?.map((p, i) => (
				<ProductCard {...p} key={i} />
			))}
		</section>
	);
}

export function CategoryProductsSkeleton() {
	return (
		<div className="grid grid-cols-2 gap-5 flex-wrap">
			{Array.from({ length: 4 }).map((_, index) => (
				<div
					key={index}
					className="flex h-64 w-full flex-col space-y-3 rounded-lg shadow md:h-80"
				>
					<Skeleton className="h-52 w-full rounded-lg object-cover md:h-64" />
					<div className="space-y-2 p-2">
						<Skeleton className="h-4 w-[160px]" />
						<Skeleton className="h-4 w-[100px]" />
					</div>
				</div>
			))}
		</div>
	);
}
