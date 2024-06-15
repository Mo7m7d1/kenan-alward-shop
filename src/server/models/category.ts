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
		return await db.category.delete({
			where: { id },
		});
	} catch (error) {
		console.log(error);
	}
}
