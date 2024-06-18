"use server";

import { Prisma } from "@prisma/client";
import { db } from "../db";
import { cache } from "react";
import { normalizeArabic } from "@/lib/utils";

type FilterProps = {
	category?: string;
	take?: number;
	currentProductId?: string;
} | null;

export const getProducts = cache(async (filters: FilterProps) => {
	try {
		if (filters?.category) {
			const products = await db.product.findMany({
				orderBy: { createdAt: "desc" },
				where: {
					categories: { every: { id: filters.category } },
					id: {
						not: filters.currentProductId
							? filters.currentProductId
							: undefined,
					},
				},
				include: {
					orders: {
						select: { count: true },
					},
				},
				take: filters.take ? filters.take : undefined,
			});

			return products?.map((product) => ({
				...product,
				totalSales: product.orders.length || 0,
			}));
		}

		const products = await db.product.findMany({
			orderBy: { createdAt: "desc" },
			include: {
				orders: {
					select: {
						count: true,
					},
				},
			},
		});

		return products.map((product) => ({
			...product,
			totalSales: product.orders.length || 0,
		}));
	} catch (error) {
		console.log(error);
	}
});

export const getProduct = cache(async (id: string) => {
	try {
		return await db.product.findUnique({
			where: { id },
			include: { categories: { select: { id: true, title: true } } },
		});
	} catch (error) {
		console.log(error);
	}
});

export const searchProducts = cache(async (query: string) => {
	try {
		if (query.length < 2) {
			return [];
		}

		// Normalize the query
		const normalizedQuery = normalizeArabic(query);

		const products = await db.product.findMany({
			where: {
				OR: [
					{
						title: {
							contains: normalizedQuery,
							mode: "insensitive",
						},
					},
					{
						title: {
							startsWith: normalizedQuery,
							mode: "insensitive",
						},
					},
					{
						title: {
							endsWith: normalizedQuery,
							mode: "insensitive",
						},
					},
				],
			},
			select: {
				id: true,
				title: true,
				images: true,
				price: true,
			},
			take: 5,
			orderBy: { price: "asc" },
		});

		// Normalize the titles and filter again for any approximate matches
		const refinedResults = products.filter((product) => {
			const normalizedTitle = normalizeArabic(product.title);
			return normalizedTitle.includes(normalizedQuery);
		});

		return refinedResults.map((p) => ({
			id: p.id,
			title: p.title,
			price: p.price,
			image: p.images[0] || "/images/placeholder.svg",
		}));
	} catch (error) {
		console.error("Error searching products:", error);
		return [];
	}
});

export const getCartProducts = cache(async (ids: string[]) => {
	try {
		return await db.product.findMany({ where: { id: { in: ids } } });
	} catch (error) {
		console.log(error);
	}
});

export async function createProduct(product: Prisma.ProductCreateInput) {
	try {
		const newProduct = await db.product.create({
			data: product,
		});
		return newProduct;
	} catch (error) {
		console.error(error);
		throw new Error("Error creating product");
	}
}

export async function updateProduct(
	id: string,
	product: Prisma.ProductUpdateInput
) {
	try {
		const updatedProduct = await db.product.update({
			where: { id },
			data: product,
		});
		return updatedProduct;
	} catch (error) {
		console.error(error);
		throw new Error("Error updating product");
	}
}

export async function deleteProduct(id: string) {
	try {
		return await db.product.delete({
			where: { id },
		});
	} catch (error) {
		console.log(error);
	}
}
