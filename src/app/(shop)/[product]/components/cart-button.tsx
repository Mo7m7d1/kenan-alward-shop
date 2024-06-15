"use client";

import LoadingSpinner from "@/components/shared/loading-spinner";
import { Button } from "@/components/ui/button";
import { ShoppingCartIcon } from "lucide-react";
import { useEffect, useState } from "react";
import QuantityButton from "./quantity-button";
import { toast } from "sonner";
import { useCart } from "@/components/shared/cart-context";

const CartButton = ({
	productId,
	stock,
}: {
	productId: string;
	stock: number;
}) => {
	const { cartItems, addToCart, updateCart } = useCart();
	const [loading, setLoading] = useState(false);
	const [itemExist, setItemExist] = useState(false);
	const [quantity, setQuantity] = useState(0);

	useEffect(() => {
		const existingItem = cartItems.find((item) => item.productId === productId);
		if (existingItem) {
			setItemExist(true);
			setQuantity(existingItem.quantity);
		}
	}, [productId, cartItems]);

	const handleClick = () => {
		if (quantity >= stock) {
			toast.error("انتهت الكمية");
			return;
		}
		if (loading) return; // Prevent multiple clicks
		setLoading(true);
		addToCart(productId, 1);
		setItemExist(true);
		setQuantity(quantity + 1);
		setLoading(false);
	};

	const handleQuantityZero = () => {
		setItemExist(false);
		setQuantity(0);
	};

	return (
		<div className="flex flex-col items-center">
			{!itemExist && (
				<Button
					onClick={handleClick}
					className="w-full py-3 text-sm font-bold flex gap-2 justify-center items-center"
					disabled={loading}
				>
					{loading ? "جاري الإضافة..." : "إضافة للسلة"}
					<ShoppingCartIcon className="w-5 h-5" />
				</Button>
			)}
			{itemExist && (
				<QuantityButton
					productId={productId}
					maxStock={stock}
					quantity={quantity}
					setQuantity={setQuantity}
					updateCart={updateCart}
					onQuantityZero={handleQuantityZero}
				/>
			)}
		</div>
	);
};

export default CartButton;
