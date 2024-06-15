import { cookies } from "next/headers";
import { type NextRequest, NextResponse } from "next/server";

export function middleware(req: NextRequest) {
	// Token validation
	const token = cookies().get("token")?.value;
	if (!token && !req.url.includes("login")) {
		// Redirect to login if token is missing
		return NextResponse.redirect(new URL("/dashboard/login", req.url));
	}
}

export const config = {
	matcher: [
		"/dashboard",
		"/dashboard/:path*",
		// "/api/:path*",
	],
};
