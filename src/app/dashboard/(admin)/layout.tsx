import { Link } from "next-view-transitions";
import {
	Bell,
	CircleUser,
	Home,
	LineChart,
	Menu,
	Package,
	Package2,
	PackagePlus,
	Search,
	ShoppingCart,
	Users,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuLabel,
	DropdownMenuSeparator,
	DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Input } from "@/components/ui/input";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { logout } from "@/server/models/user";
import ManageUserAccount from "./_components/manage-user-modal";

export const metadata = {
	title: "كنان الورد: لوحة التحكم",
	description:
		"مرحبًا بكم في كنان الورد، المتجر السعودي الرائد للهدايا وباقات الورود.",
};

export default function RootLayout({
	children,
}: {
	children: React.ReactNode;
}) {
	return (
		<div className="grid min-h-screen w-full md:grid-cols-[220px_1fr] lg:grid-cols-[280px_1fr]">
			<div className="hidden border-r bg-muted/40 md:block">
				<div className="flex h-full max-h-screen flex-col gap-2">
					<div className="flex h-14 items-center border-b px-4 lg:h-[60px] lg:px-6">
						<Link
							href="/dashboard/"
							className="flex items-center gap-2 font-semibold"
						>
							<h1 className="text-xl text-purple-500">كنان الورد</h1>
						</Link>
					</div>
					<div className="flex-1">
						<nav className="grid items-start px-2 text-sm font-medium lg:px-4">
							<Link
								href="/dashboard"
								className="flex items-center gap-3 rounded-lg px-3 py-2 text-lg text-muted-foreground transition-all hover:text-primary"
							>
								<Home className="h-4 w-4" />
								الرئيسية
							</Link>
							<Link
								href="/dashboard/orders"
								className="flex items-center gap-3 rounded-lg px-3 py-2 text-lg text-muted-foreground transition-all hover:text-primary"
							>
								<ShoppingCart className="h-4 w-4" />
								الطلبات
							</Link>
							<Link
								href="/dashboard/categories"
								className="flex items-center gap-3 rounded-lg px-3 py-2 text-lg text-muted-foreground transition-all hover:text-primary"
							>
								<PackagePlus className="h-4 w-4" />
								الأقسام{" "}
							</Link>
							<Link
								href="/dashboard/products"
								className="flex items-center gap-3 rounded-lg px-3 py-2 text-lg text-muted-foreground transition-all hover:text-primary"
							>
								<Package className="h-4 w-4" />
								المنتجات{" "}
							</Link>
							<Link
								href="/dashboard/customers"
								className="flex items-center gap-3 rounded-lg px-3 py-2 text-lg text-muted-foreground transition-all hover:text-primary"
							>
								<Users className="h-4 w-4" />
								العملاء
							</Link>
						</nav>
					</div>
				</div>
			</div>
			<div className="flex flex-col">
				<header className="flex h-14 items-center gap-4 border-b bg-muted/40 px-4 lg:h-[60px] lg:px-6">
					<Sheet>
						<SheetTrigger asChild>
							<Button
								variant="outline"
								size="icon"
								className="shrink-0 md:hidden"
							>
								<Menu className="h-5 w-5" />
								<span className="sr-only">Toggle navigation menu</span>
							</Button>
						</SheetTrigger>
						<SheetContent side="right" className="flex flex-col">
							<nav className="grid gap-2 text-lg font-medium">
								<Link
									href="/dashboard"
									className="flex items-center gap-2 text-lg font-semibold"
								>
									<Package2 className="h-6 w-6" />
									<span className="sr-only">روز</span>
								</Link>
								<Link
									href="/dashboard"
									className="mx-[-0.65rem] flex items-center gap-4 rounded-xl px-3 py-2 text-muted-foreground hover:text-foreground"
								>
									<Home className="h-5 w-5" />
									الرئيسية
								</Link>
								<Link
									href="/dashboard/orders"
									className="mx-[-0.65rem] flex items-center gap-4 rounded-xl px-3 py-2 text-muted-foreground hover:text-foreground"
								>
									<ShoppingCart className="h-5 w-5" />
									الطلبات
								</Link>
								<Link
									href="/dashboard/categories"
									className="flex items-center gap-3 rounded-lg px-3 py-2 text-lg text-muted-foreground transition-all hover:text-primary"
								>
									<PackagePlus className="h-4 w-4" />
									الأقسام{" "}
								</Link>
								<Link
									href="/dashboard/products"
									className="mx-[-0.65rem] flex items-center gap-4 rounded-xl px-3 py-2 text-muted-foreground hover:text-foreground"
								>
									<Package className="h-5 w-5" />
									المنتجات
								</Link>
								<Link
									href="/dashboard/customers"
									className="mx-[-0.65rem] flex items-center gap-4 rounded-xl px-3 py-2 text-muted-foreground hover:text-foreground"
								>
									<Users className="h-5 w-5" />
									العملاء
								</Link>
							</nav>
						</SheetContent>
					</Sheet>
					<div className="w-full flex-1" dir="rtl">
						<form>
							<div className="relative">
								{/* <Search className="absolute right-2.5 top-2.5 h-4 w-4 text-muted-foreground" /> */}
								<Input
									type="search"
									placeholder="ابحث في المنتجات..."
									className="w-full appearance-none bg-background pl-8 shadow-none md:w-2/3 lg:w-1/3"
								/>
							</div>
						</form>
					</div>
					<DropdownMenu dir="rtl">
						<DropdownMenuTrigger asChild>
							<Button variant="secondary" size="icon" className="rounded-full">
								<CircleUser className="h-5 w-5" />
								<span className="sr-only">Toggle user menu</span>
							</Button>
						</DropdownMenuTrigger>
						<DropdownMenuContent align="end" className="text-right">
							<DropdownMenuLabel>حسابك</DropdownMenuLabel>

							<DropdownMenuSeparator />
							<ManageUserAccount />
							{/* <DropdownMenuItem>الدعم</DropdownMenuItem> */}
							<DropdownMenuSeparator />
							<form action={logout}>
								<Button size={"sm"} variant={"ghost"}>
									تسجيل الخروج
								</Button>
							</form>
						</DropdownMenuContent>
					</DropdownMenu>
				</header>
				{children}
			</div>
		</div>
	);
}
