import CategoriesProducts from "@/components/sections/categories-products";

export const metadata = {
	title: "كنان الورد: الفئات",
	description: "استعرض الأقسام المتنوعة من منتجات كنان الورد.",
};

export default function page() {
	return (
		<main className="my-10">
			<CategoriesProducts />
		</main>
	);
}
