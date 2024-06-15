import { getCategories } from "@/server/models/category";
import { Flower } from "lucide-react";
import { Link } from "next-view-transitions";

export default async function CategoriesProducts() {
	const categories = await getCategories();
	return (
		<section className="w-full" id="categories">
			<div className="container grid gap-8 px-4 md:px-6">
				<div className="flex flex-col items-center justify-center space-y-4 text-center">
					<div className="space-y-2">
						<h2 className="text-3xl font-bold tracking-tighter sm:text-5xl">
							الأقسام
						</h2>
						<p className="max-w-[700px] text-gray-500 dark:text-gray-400 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
							تسوق حسب القسم
						</p>
					</div>
				</div>
				<div className="grid grid-cols-2 gap-6 sm:grid-cols-3 md:gap-8">
					{categories?.map((category, i) => (
						<CategoryCard
							key={i}
							title={category.title}
							description={category.description ?? ""}
							url={`/categories/${
								category.id
							}?categoryName=${encodeURIComponent(category.title)}`}
							icon={<Flower />}
						/>
					))}
				</div>
			</div>
		</section>
	);
}

type CategoryCardProps = {
	title: string;
	description: string;
	url: string;
	icon: JSX.Element;
};

export function CategoryCard({
	title,
	description,
	url,
	icon,
}: CategoryCardProps) {
	return (
		<Link
			className="group grid gap-4 rounded-lg p-4 transition-colors hover:bg-gray-100 dark:hover:bg-gray-800"
			href={url}
		>
			<div className="rounded-lg bg-gray-100 p-3 transition-colors group-hover:bg-gray-200 dark:bg-gray-800 dark:group-hover:bg-gray-700">
				{icon}
			</div>
			<div className="grid gap-1">
				<h3 className="text-lg font-semibold transition-colors group-hover:text-gray-900 dark:group-hover:text-gray-50">
					{title}
				</h3>
				<p className="text-sm text-gray-500 dark:text-gray-400">
					{description}
				</p>
			</div>
		</Link>
	);
}
