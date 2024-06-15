// Import required packages
import { NextAuthOptions } from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import { PrismaAdapter } from "@next-auth/prisma-adapter";
import { db } from "./db";

// Configure NextAuth
export const authOptions: NextAuthOptions = {
	// Configure Google as the authentication provider
	providers: [
		GoogleProvider({
			// Set Google OAuth client ID obtained from environment variables
			clientId: process.env.GOOGLE_CLIENT_ID as string,
			// Set Google OAuth client secret obtained from environment variables
			clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
		}),
	],
	// Configure the Prisma adapter
	adapter: PrismaAdapter(db),
	// Configure session settings
	session: {
		strategy: "jwt",
		maxAge: 30 * 24 * 60 * 60, // 30 days
		updateAge: 24 * 60 * 60, // 24 hours
	},
	// Configure callbacks
	callbacks: {
		async session({ session, token, user }) {
			// Send user id and email to the client
			if (session.user) {
				session.user.id = token.id;
				session.user.email = token.email!;
				session.user.image = token.picture;
				session.user.name = token.name;
			}
			return session;
		},
		async jwt({ token, user }) {
			// Add user id to the token
			if (user) {
				token.id = user.id;
				token.email = user.email;
				token.name = user.name;
				token.picture = user.image;
			}
			return token;
		},
	},
};
