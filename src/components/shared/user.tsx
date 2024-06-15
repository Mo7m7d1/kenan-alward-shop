"use client";

import { Button } from "@/components/ui/button";
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuGroup,
	DropdownMenuItem,
	DropdownMenuSeparator,
	DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
	HomeIcon,
	ListOrderedIcon,
	ShoppingCart,
	UserIcon,
} from "lucide-react";
import { Link } from "next-view-transitions";
import LogoutButton from "./logout-button";

export function UserNav() {
	return (
		<DropdownMenu dir="rtl">
			<DropdownMenuTrigger asChild>
				<Button size="icon" variant="ghost">
					<UserIcon />
				</Button>
			</DropdownMenuTrigger>
			<DropdownMenuContent className="w-56 ml-4" align="start" forceMount>
				<DropdownMenuGroup>
					<Link href="/profile/edit" className="cursor-pointer">
						<DropdownMenuItem className="flex gap-2">
							<UserIcon className="h-4" />
							الحساب
						</DropdownMenuItem>
					</Link>
					<Link href="/profile/addresses" className="cursor-pointer">
						<DropdownMenuItem className="flex gap-2">
							<HomeIcon className="h-4" />
							العنوانين
						</DropdownMenuItem>
					</Link>
					<Link href="/profile/orders" className="cursor-pointer">
						<DropdownMenuItem className="flex gap-2">
							<ListOrderedIcon className="h-4" />
							الطلبات
						</DropdownMenuItem>
					</Link>
					<DropdownMenuSeparator />
					<Link href="/cart" className="cursor-pointer">
						<DropdownMenuItem className="flex gap-2">
							<ShoppingCart className="h-4" /> السلة
						</DropdownMenuItem>
					</Link>
				</DropdownMenuGroup>
				<DropdownMenuSeparator />
				<DropdownMenuItem className="cursor-pointer pb-1 flex gap-2 justify-right">
					<LogoutButton />
				</DropdownMenuItem>
			</DropdownMenuContent>
		</DropdownMenu>
	);
}
