"use client";

import { Button } from "@/components/ui/button";
import { useEffect, useState } from "react";
import { Minus, Plus } from "lucide-react";
import { toast } from "sonner";

const QuantityButton = ({
	productId,
	maxStock,
	quantity,
	setQuantity,
	updateCart,
	onQuantityZero,
}: {
	productId: string;
	maxStock: number;
	quantity: number;
	setQuantity: React.Dispatch<React.SetStateAction<number>>;
	updateCart: (productId: string, quantity: number) => void;
	onQuantityZero: () => void;
}) => {
	const [disableIncrement, setDisableIncrement] = useState(false);

	useEffect(() => {
		const existingCart = JSON.parse(localStorage.getItem("cart-items") || "[]");
		const existingItem = existingCart.find(
			(item: any) => item.productId === productId
		);
		if (existingItem) {
			setQuantity(existingItem.quantity);
		}
	}, [productId, setQuantity]);

	const handleIncrement = () => {
		setQuantity((prev) => {
			if (prev < maxStock) {
				const newQuantity = prev + 1;
				updateCart(productId, newQuantity);
				return newQuantity;
			} else {
				setDisableIncrement(true);
				toast.error("لا يمكن إضافة المزيد!");
				return prev;
			}
		});
	};

	const handleDecrement = () => {
		setQuantity((prev) => {
			const newQuantity = prev - 1;
			updateCart(productId, newQuantity);
			if (newQuantity === 0) {
				onQuantityZero();
			}
			return newQuantity;
		});
	};

	return (
		<div className="flex items-center gap-2 mt-2">
			<Button
				onClick={handleDecrement}
				variant={quantity === 1 ? "destructive" : "secondary"}
				className="px-2 py-1 font-bold text-sm"
				disabled={quantity < 1}
			>
				<Minus />
			</Button>
			<span className="text-2xl font-semibold">{quantity}</span>
			<Button
				onClick={handleIncrement}
				variant={"secondary"}
				className="px-2 py-1 font-bold text-sm"
				disabled={quantity === maxStock}
			>
				<Plus />
			</Button>
		</div>
	);
};

export default QuantityButton;
