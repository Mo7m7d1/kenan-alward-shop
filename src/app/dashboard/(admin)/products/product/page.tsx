import { db } from "@/server/db";
import { ProductForm } from "./product-form";
import { getCategories } from "@/server/models/category";

export default async function ProductPage({
	searchParams,
}: {
	searchParams: { id: string };
}) {
	let product = undefined;
	if (searchParams.id)
		product = await db.product.findUnique({
			where: {
				id: searchParams.id,
			},
			include: {
				categories: true, // Ensure correct relation name here
			},
		});

	const categories = await getCategories();

	return (
		<div className="m-4 flex-col">
			<div className="flex-1 space-y-4 pb-12 pt-6">
				<ProductForm
					categories={categories || []}
					initialData={product as any}
				/>
			</div>
		</div>
	);
}
