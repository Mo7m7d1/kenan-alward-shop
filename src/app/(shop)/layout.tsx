import Navbar from "@/components/sections/navbar";
import Footer from "@/components/sections/footer";
import { AuthProvider } from "@/components/shared/auth-provider";
import { CartProvider } from "@/components/shared/cart-context";

export const metadata = {
	title: "Roses",
	description: "Roses app",
	icons: [{ rel: "icon", url: "/favicon.ico" }],
};

export default async function RootLayout({
	children,
}: {
	children: React.ReactNode;
}) {
	return (
		<>
			<AuthProvider>
				<CartProvider>
					<Navbar />
					<main className="mx-auto flex min-h-screen w-full max-w-5xl flex-col px-6 py-10">
						{children}
					</main>
					<Footer />
				</CartProvider>
			</AuthProvider>
		</>
	);
}
