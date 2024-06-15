"use server";

import { db } from "../db";

export async function getReports() {
	try {
		// Fetch total revenue
		const totalRevenue = await db.order.aggregate({
			_sum: {
				payable: true,
			},
		});

		// Fetch total subscriptions
		const totalSubscriptions = await db.order.count({
			where: {
				status: "Processing",
			},
		});

		// Fetch total sales
		const totalSales = await db.orderItem.count();

		// Fetch active users
		const activeUsers = await db.session.count({
			where: {
				expires: {
					gte: new Date(),
				},
			},
		});

		// Fetch recent transactions
		const recentTransactions = await db.order.findMany({
			orderBy: {
				createdAt: "desc",
			},
			take: 5,
			include: {
				user: true,
			},
		});

		return {
			totalRevenue: totalRevenue._sum.payable,
			totalSubscriptions,
			totalSales,
			activeUsers,
			recentTransactions,
		};
	} catch (error) {
		console.log("Internal server error", error);
	}
}
