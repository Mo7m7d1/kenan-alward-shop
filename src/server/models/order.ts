"use server";

import { Prisma } from "@prisma/client";
import { db } from "../db";
import { revalidatePath } from "next/cache";

export async function getOrders() {
	try {
		return await db.order.findMany({
			orderBy: { createdAt: "desc" },
			include: { user: true },
		});
	} catch (error) {
		console.log(error);
	}
}

export async function getOrder(id: string) {
	try {
		return await db.order.findUnique({ where: { id } });
	} catch (error) {
		console.log(error);
	}
}

export async function createOrder(order: Prisma.OrderCreateInput) {
	try {
		const newOrder = await db.order.create({
			data: order,
		});
		revalidatePath("/dashboard/orders");
		return newOrder;
	} catch (error) {
		console.log(error);
	}
}

export async function updateOrder(id: string, order: Prisma.OrderUpdateInput) {
	try {
		const updatedOrder = await db.order.update({
			where: { id },
			data: order,
		});
		revalidatePath("/dashboard/orders");

		return updatedOrder;
	} catch (error) {
		console.log(error);
	}
}

export async function deleteOrder(id: string) {
	try {
		return await db.order.delete({
			where: { id },
		});
	} catch (error) {
		console.log(error);
	}
}
