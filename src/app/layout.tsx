import "./globals.css";

import { Tajawal } from "next/font/google";
import { Toaster } from "@/components/ui/sonner";
import { ViewTransitions } from "next-view-transitions";

const font = Tajawal({
	subsets: ["arabic", "latin"],
	weight: ["200", "400", "700"],
	fallback: ["system-ui", "arial"],
});

export const metadata = {
	title: "كنان الورد",
	description:
		"مرحبًا بكم في كنان الورد، المتجر السعودي الرائد للهدايا وباقات الورود.",
	icons: [{ rel: "icon", url: "/favicon.ico" }],
};

export default function RootLayout({
	children,
}: {
	children: React.ReactNode;
}) {
	return (
		<ViewTransitions>
			<html dir="rtl" lang="ar">
				<body className={font.className}>
					{children}

					<Toaster richColors closeButton position="top-right" />
				</body>
			</html>
		</ViewTransitions>
	);
}
