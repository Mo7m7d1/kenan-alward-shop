"use client";

import { ShoppingCart } from "lucide-react";
import { Link } from "next-view-transitions";
import React from "react";
import { buttonVariants } from "../ui/button";
import { useCart } from "../shared/cart-context";

export default function NavbarCartButton({ className }: { className: string }) {
	const { totalItems } = useCart();

	return (
		<Link
			href={"/cart"}
			className={buttonVariants({
				size: "icon",
				variant: "ghost",
				className,
			})}
			style={{ position: "relative" }} // Ensure the link container can position the badge correctly
		>
			<ShoppingCart />
			{totalItems > 0 && (
				<span
					style={{
						position: "absolute",
						top: "-4px",
						right: "-4px",
						color: "white",
						borderRadius: "50%",
						padding: "0px 9px",
						fontSize: "12px",
						fontWeight: "bold",
					}}
					className="bg-red-500"
				>
					{totalItems}
				</span>
			)}
		</Link>
	);
}
