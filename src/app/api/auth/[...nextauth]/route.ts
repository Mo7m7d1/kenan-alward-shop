import NextAuth from "next-auth";
import type { NextApiRequest, NextApiResponse } from "next";
import { authOptions } from "@/server/auth";

// Define handler function to process authentication requests
const handler = (req: NextApiRequest, res: NextApiResponse) =>
	NextAuth(req, res, authOptions);

// Export handler function for both GET and POST requests
export { handler as GET, handler as POST };
