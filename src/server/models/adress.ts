"use server";

import { Prisma } from "@prisma/client";
import { db } from "../db";
import { revalidatePath } from "next/cache";
import { getServerAuth } from "@/lib/utils";

export async function getAddresses() {
	try {
		const session = await getServerAuth();
		if (!session?.user) return;

		return await db.address.findMany({
			orderBy: { createdAt: "desc" },
			where: { userId: session.user.id },
		});
	} catch (error) {
		console.log(error);
	}
}

export async function getAddress(id: string) {
	try {
		return await db.address.findUnique({ where: { id } });
	} catch (error) {
		console.log(error);
	}
}

export async function createAddress(address: Prisma.AddressCreateInput) {
	try {
		const newAddress = await db.address.create({
			data: address,
		});
		revalidatePath("profile/addresses");
		return newAddress;
	} catch (error) {
		console.log(error);
	}
}

export async function updateAddress(
	id: string,
	address: Prisma.AddressUpdateInput
) {
	try {
		const updatedAddress = await db.address.update({
			where: { id },
			data: address,
		});
		revalidatePath("/profile/addresses");

		return updatedAddress;
	} catch (error) {
		console.log(error);
	}
}

export async function deleteAddress(id: string) {
	try {
		return await db.address.delete({
			where: { id },
		});
	} catch (error) {
		console.log(error);
	}
}
