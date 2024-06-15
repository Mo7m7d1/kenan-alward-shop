import NextAuth, { DefaultSession, DefaultUser, DefaultJWT } from "next-auth";

// Extending the default session
declare module "next-auth" {
	interface Session {
		user: {
			id: string;
			email: string;
		} & DefaultSession["user"];
	}

	interface User extends DefaultUser {
		id: string;
		email: string;
	}
}

// Extending the default JWT
declare module "next-auth/jwt" {
	interface JWT {
		id: string;
	}
}
