import CategoriesProducts from "@/components/sections/categories-products";
import CustomersReviews from "@/components/sections/customers-reviews";
import Services from "@/components/sections/services";
import HomeCarousel, {
	HomeCarouselSkeleton,
} from "@/components/shared/home-carousel";
import Image from "next/image";
import { Suspense } from "react";

export const metadata = {
	title: "كنان الورد",
	description:
		"مرحبًا بكم في كنان الورد، المتجر السعودي الرائد للهدايا وباقات الورود.",
};

export default function page() {
	return (
		<main className="space-y-16">
			<Image
				src={"/images/home.png"}
				alt="image"
				width={300}
				height={200}
				className="h-[300px] w-full rounded-xl border object-contain"
				quality={100}
			/>

			<Suspense key={Math.random()} fallback={<HomeCarouselSkeleton />}>
				<HomeCarousel />
			</Suspense>

			<CategoriesProducts />

			<Services />

			<CustomersReviews />
		</main>
	);
}
