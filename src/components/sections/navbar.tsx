import { Button } from "@/components/ui/button";
import { SheetTrigger, SheetContent, Sheet } from "@/components/ui/sheet";
import { Link } from "next-view-transitions";
import { UserNav } from "../shared/user";
import { LoginModal } from "../shared/login-modal";
import Image from "next/image";
import NavbarCartButton from "./navbar-cart-button";
import SearchModal from "../shared/search-modal";
import { getServerAuth } from "@/lib/utils";

export default async function Navbar() {
	const session = await getServerAuth();
	const links = [
		{ href: "/", label: "الرئيسية" },
		{ href: "/categories", label: "الأقسام" },
		{ href: "/about", label: "من نحن" },
		{ href: "/contact", label: "تواصل معنا" },
	];

	const navLinks = links.map((link, index) => (
		<Link
			key={index}
			className="group inline-flex h-9 w-max items-center justify-center rounded-md bg-white px-4 py-2 text-sm font-medium transition-colors hover:bg-gray-100 hover:text-gray-900 focus:bg-gray-100 focus:text-gray-900 focus:outline-none disabled:pointer-events-none disabled:opacity-50 data-[active]:bg-gray-100/50 data-[state=open]:bg-gray-100/50 dark:bg-gray-950 dark:hover:bg-gray-800 dark:hover:text-gray-50 dark:focus:bg-gray-800 dark:focus:text-gray-50 dark:data-[active]:bg-gray-800/50 dark:data-[state=open]:bg-gray-800/50"
			href={link.href}
		>
			{link.label}
		</Link>
	));

	const sheetLinks = links.map((link, index) => (
		<Link
			key={index}
			className="flex w-full items-center py-2 text-lg font-semibold"
			href={link.href}
		>
			{link.label}
		</Link>
	));
	return (
		<header className="sticky top-0 z-50  mx-auto  flex h-[68px] w-full max-w-5xl shrink-0 items-center rounded-b-lg bg-white px-6 shadow dark:bg-slate-950">
			<Sheet>
				<SheetTrigger asChild>
					<Button className="lg:hidden" size="icon" variant="ghost">
						<MenuIcon className="h-6 w-6" />
						<span className="sr-only">Toggle navigation menu</span>
					</Button>
				</SheetTrigger>
				<SheetContent side="right" className="w-72">
					<Link className="" href="/">
						<Image
							src={"/images/logo.png"}
							className="h-[60px] object-contain"
							alt="كنان الورد"
							height={50}
							width={50}
						/>
						<span className="sr-only">كنان الورد</span>
					</Link>
					<div className="grid justify-center gap-2 py-6">{sheetLinks}</div>
				</SheetContent>
			</Sheet>
			<Link className="mr-2" href="/">
				<Image
					src={"/images/logo.png"}
					className="h-[60px] object-contain"
					alt="كنان الورد"
					height={50}
					width={50}
				/>
				<span className="sr-only">كنان الورد</span>
			</Link>
			<div className="flex w-full items-center justify-end gap-2">
				<div className="flex lg:hidden">
					<SearchModal />
				</div>
				<NavbarCartButton className="flex lg:hidden" />
				<div className="flex lg:hidden">
					{session?.user ? <UserNav /> : <LoginModal />}
				</div>

				<nav className="mx-auto hidden gap-6 lg:flex">{navLinks}</nav>
				<div className="hidden lg:flex">
					<SearchModal />
				</div>
				<NavbarCartButton className="hidden lg:flex" />
				<div className="hidden lg:flex">
					{session?.user ? <UserNav /> : <LoginModal />}
				</div>
			</div>
		</header>
	);
}

function MenuIcon(props: any) {
	return (
		<svg
			{...props}
			xmlns="http://www.w3.org/2000/svg"
			width="24"
			height="24"
			viewBox="0 0 24 24"
			fill="none"
			stroke="currentColor"
			strokeWidth="2"
			strokeLinecap="round"
			strokeLinejoin="round"
		>
			<line x1="4" x2="20" y1="12" y2="12" />
			<line x1="4" x2="20" y1="6" y2="6" />
			<line x1="4" x2="20" y1="18" y2="18" />
		</svg>
	);
}
