"use server";
import { getServerSession } from "next-auth";
import { db } from "../db";
import { authOptions } from "../auth";
import { getProduct } from "./product";

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
	const session = await getServerSession(authOptions);
	const userId = (
		await db.user.findUnique({
			where: { email: session?.user?.email ?? "" },
			select: { id: true },
		})
	)?.id;

	if (!userId) {
		return { error: "حصل خطأ ما!" };
	}

	try {
		let total = 0;
		const taxRate = 0.05; // Example tax rate
		const shippingCost = 10; // Example fixed shipping cost

		// Calculate the total amount and update stock
		for (const product of products) {
			const p = await getProduct(product.productId);

			if (!p) {
				return { error: `Product with ID ${product.productId} not found` };
			}

			if (p.stock < product.quantity) {
				return { error: `Insufficient stock for product ${p.title}` };
			}

			total += p.price * product.quantity;

			// Reduce the stock of the product
			await db.product.update({
				where: { id: product.productId },
				data: { stock: p.stock - product.quantity },
			});
		}

		const tax = total * taxRate;
		const payable = total + tax + shippingCost;

		// Insert the order
		const order = await db.order.create({
			data: {
				user: { connect: { id: userId } },
				status: "Processing",
				total,
				shipping: shippingCost,
				payable,
				tax,
				discount: 0, // Assuming no discount for now
				isPaid: true,
				Address: { connect: { id: address } },
				// paymentType,
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
					discount: 0, // Assuming no discount for now
				},
			});
		}

		return { success: true };
	} catch (error) {
		console.error(error);
		return { error: (error as Error).message };
	}
}
