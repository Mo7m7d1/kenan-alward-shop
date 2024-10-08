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

export async function getPaginatedOrders(page = 1, limit = 10) {
	const offset = (page - 1) * limit;
	const orders = await db.order.findMany({
		skip: offset,
		take: limit,
		include: { user: { select: { email: true } } },
		orderBy: { createdAt: "desc" },
	});
	const totalOrders = await db.order.count();
	return { orders, totalOrders };
}

export async function getPaginatedCustomerOrders(
	userId: string,
	page = 1,
	limit = 10
) {
	const offset = (page - 1) * limit;
	const orders = await db.order.findMany({
		where: { userId },
		skip: offset,
		take: limit,
		orderBy: { createdAt: "desc" },
	});
	const totalOrders = await db.order.count({ where: { userId } });
	return { orders, totalOrders };
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
