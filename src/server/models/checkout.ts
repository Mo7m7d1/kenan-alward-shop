"use server";

import { ShippingCost, TAX_RATE } from "@/lib/constants";
import { db } from "../db";
import { getProduct } from "./product";
import { getServerAuth } from "@/lib/utils";

type CartItems = {
	productId: string;
	quantity: number;
}[];

export async function checkout({
	address,
	paymentType,
	products,
}: {
	address: string;
	paymentType: string;
	products: CartItems;
}) {
	const session = await getServerAuth();
	if (!session?.user) {
		return { error: "المستخدم غير مسجل مدخول!" };
	}

	const userId = (
		await db.user.findUnique({
			where: { email: session?.user?.email ?? "" },
			select: { id: true },
		})
	)?.id;

	if (!userId) {
		return { error: "المتسخدم غير موجود!" };
	}

	try {
		let totalPrice = 0;
		let totalDiscount = 0;

		// Calculate the total amount and update stock
		for (const product of products) {
			const p = await getProduct(product.productId);

			if (!p) {
				return { error: `Product with ID ${product.productId} not found` };
			}

			if (p.stock < product.quantity) {
				return { error: `Insufficient stock for product ${p.title}` };
			}

			const productPrice = p.price * product.quantity;
			const productDiscount =
				((p.discount || 0) / 100) * p.price * product.quantity;

			totalPrice += productPrice;
			totalDiscount += productDiscount;

			// Reduce the stock of the product
			await db.product.update({
				where: { id: product.productId },
				data: { stock: p.stock - product.quantity },
			});
		}

		const priceAfterDiscount = totalPrice - totalDiscount;
		const tax = priceAfterDiscount * TAX_RATE;
		const payable = priceAfterDiscount + tax + ShippingCost;

		// Insert the order
		const order = await db.order.create({
			data: {
				user: { connect: { id: userId } },
				status: "Processing",
				total: totalPrice,
				shipping: ShippingCost,
				payable,
				tax,
				discount: totalDiscount,
				isPaid: true,
				Address: { connect: { id: address } },
				// paymentType : {connect: {id: paymentType}},
			},
		});

		for (const product of products) {
			const p = await getProduct(product.productId);
			await db.orderItem.create({
				data: {
					orderId: order.id,
					productId: product.productId,
					count: product.quantity,
					price: p?.price ?? 0,
					discount: p?.discount ?? 0,
				},
			});
		}

		return { success: true };
	} catch (error) {
		console.error(error);
		return { error: (error as Error).message };
	}
}
