"use server";

import { Prisma } from "@prisma/client";
import { db } from "../db";
import { revalidatePath } from "next/cache";

export async function getCategories() {
	try {
		return await db.category.findMany({
			orderBy: { createdAt: "desc" },
			include: { products: true },
		});
	} catch (error) {
		console.log(error);
	}
}

export async function getPaginatedCategories(page = 1, limit = 10) {
	const offset = (page - 1) * limit;
	const categories = await db.category.findMany({
		skip: offset,
		take: limit,
		include: { products: true },
		orderBy: { createdAt: "desc" },
	});
	const totalCategories = await db.category.count();
	return { categories, totalCategories };
}

export async function getCategory(id: string) {
	try {
		return await db.category.findUnique({ where: { id } });
	} catch (error) {
		console.log(error);
	}
}

export async function createCategory(category: Prisma.CategoryCreateInput) {
	try {
		const newCategory = await db.category.create({
			data: category,
		});
		revalidatePath("/dashboard/categories");
		return newCategory;
	} catch (error) {
		console.log(error);
	}
}

export async function updateCategory(
	id: string,
	category: Prisma.CategoryUpdateInput
) {
	try {
		const updatedCategory = await db.category.update({
			where: { id },
			data: category,
		});
		revalidatePath("/dashboard/categories");

		return updatedCategory;
	} catch (error) {
		console.log(error);
	}
}

export async function deleteCategory(id: string) {
	try {
		await db.category.delete({
			where: { id },
		});
		revalidatePath("/dashboard/categories");
	} catch (error) {
		console.log(error);
	}
}
