"use server";

import { compare, hash, hashSync } from "bcrypt";
import { cookies } from "next/headers";
import jwt, { TokenExpiredError, JsonWebTokenError } from "jsonwebtoken";
import { redirect } from "next/navigation";
import z from "zod";
import { db } from "../db";
import { Prisma } from "@prisma/client";
import { getServerAuth } from "@/lib/utils";

const zLoginSchema = z.object({
	email: z.string().min(1, "الاسم مطلوب"),
	password: z.string().min(1, "كلمة المرور مطلوبة"),
});

type User = {
	email: string;
	password: string;
};

type LoginResponse = {
	success: boolean;
	error?: string;
	token?: string;
};

export async function login(userData: User): Promise<LoginResponse> {
	const validatedUser = zLoginSchema.safeParse(userData);
	if (!validatedUser.success) {
		return { success: false, error: validatedUser.error.message };
	}
	try {
		const dbUser = await db.user.findUnique({
			where: { email: validatedUser.data.email },
		});

		if (!dbUser || !dbUser?.password) {
			return { success: false, error: "المستخدم غير موجود" };
		}

		const passwordMatch = await compare(
			validatedUser.data.password,
			dbUser.password
		);
		if (!passwordMatch) {
			return { success: false, error: "كلمة المرور غير صحيحة" };
		}

		const token = jwt.sign({ email: dbUser.email }, process.env.JWT_SECRET!);
		cookies().set("token", token, {
			httpOnly: true,
			secure: false,
			maxAge: 60 * 60 * 24 * 30,
		});

		return { success: true, token };
	} catch (error) {
		console.log({ error });
		return { success: false, error: (error as Error).message };
	}
}

type registerResponse = {
	success: boolean;
	error?: string;
};

export async function registerNewUser(
	newUser: User
): Promise<registerResponse> {
	const validatedUser = zLoginSchema.safeParse(newUser);
	if (!validatedUser.success) {
		return { success: false, error: validatedUser.error.message };
	}

	try {
		const user = validatedUser.data;
		const userExists = await db.user.findUnique({
			where: { email: user.email },
		});

		if (userExists?.id) {
			return { success: false, error: "المستخدم موجود مسبقا" };
		}

		const hashedPassword = await hash(user.password, 10);
		await db.user.create({
			data: {
				...user,
				password: hashedPassword,
			},
		});

		return { success: true };
	} catch (error) {
		return { success: false, error: (error as Error).message };
	}
}

export async function getUsers() {
	try {
		const users = await db.user.findMany({
			select: {
				id: true,
				email: true,
				name: true,
				image: true,
				createdAt: true,
				orders: { select: { _count: true } },
			},
			// where: { password: { not: null } },
		});
		return users;
	} catch (error) {
		// return { error: (error as Error).message };
		console.log(error);
	}
}

export async function getUser() {
	try {
		const session = await getServerAuth();
		if (!session?.user) return { success: false };

		const user = await db.user.findUnique({ where: { id: session.user.id } });

		return { success: true, user };
	} catch (error) {
		console.log(error);
	}
}
export async function getAdmin() {
	try {
		const token = await getTokenData();
		if (!token) return { success: false };

		const user = await db.user.findUnique({ where: { email: token.email } });

		return { success: true, user };
	} catch (error) {
		console.log(error);
	}
}

type UserResponse = {
	error?: string;
	success: boolean;
};

export async function updateUser(
	id: string,
	userData: Prisma.UserUpdateInput
): Promise<UserResponse> {
	try {
		await db.user.update({
			where: { id },
			data: {
				...userData,
				password: hashSync(userData.password?.toString()!, 10),
			},
		});
		return { success: true };
	} catch (error) {
		return { success: false, error: (error as Error).message };
	}
}

export async function deleteUser(id: string): Promise<UserResponse> {
	try {
		await db.user.delete({ where: { id } });
		return { success: true };
	} catch (error) {
		return { success: false, error: (error as Error).message };
	}
}

export async function getCustomerOrders() {
	try {
		const session = await getServerAuth();
		if (!session?.user.id) {
			return { success: false, message: "المستخدم عير موجود" };
		}

		const orders = await db.order.findMany({
			where: { user: { id: session?.user.id } },
			orderBy: { createdAt: "desc" },
		});

		return { success: true, orders };
	} catch (error) {
		// return { success: false, error: (error as Error).message };
		console.log(error);
	}
}

type TokenData = { email: string; role: string; iat: number };

export async function getTokenData(): Promise<TokenData | null> {
	const token = cookies().get("token")?.value;
	if (!token) return null;

	try {
		const decodedToken = jwt.verify(
			token,
			process.env.JWT_SECRET!
		) as TokenData;
		return decodedToken;
	} catch (error) {
		if (error instanceof TokenExpiredError) {
			console.error("Token expired:", error.message);
		} else if (error instanceof JsonWebTokenError) {
			console.error("JWT error:", error.message);
		} else {
			console.error("JWT verification error:", error);
		}
		return null;
	}
}

export async function logout() {
	cookies().delete("token");
	redirect("/dashboard/login");
}

export async function isAuthenticated() {
	return !!cookies().get("token")?.value;
}
