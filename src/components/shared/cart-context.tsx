"use client";

import React, { createContext, useContext, useState, useEffect } from "react";

type CartItem = {
	productId: string;
	quantity: number;
};

type CartContextType = {
	cartItems: CartItem[];
	addToCart: (productId: string, quantity: number) => void;
	updateCart: (productId: string, quantity: number) => void;
	removeFromCart: (productId: string) => void;
	clearCart: () => void;
	totalItems: number;
};

const CartContext = createContext<CartContextType | undefined>(undefined);

export const CartProvider: React.FC<{ children: React.ReactNode }> = ({
	children,
}) => {
	const [cartItems, setCartItems] = useState<CartItem[]>([]);

	useEffect(() => {
		const storedCartItems = JSON.parse(
			localStorage.getItem("cart-items") || "[]"
		);
		setCartItems(storedCartItems);
	}, []);

	const addToCart = (productId: string, quantity: number) => {
		setCartItems((prevCartItems) => {
			const existingItemIndex = prevCartItems.findIndex(
				(item) => item.productId === productId
			);
			const newCartItems = [...prevCartItems];
			if (existingItemIndex > -1) {
				newCartItems[existingItemIndex] = {
					...newCartItems[existingItemIndex],
					quantity: newCartItems[existingItemIndex].quantity + quantity,
				};
			} else {
				newCartItems.push({ productId, quantity });
			}
			localStorage.setItem("cart-items", JSON.stringify(newCartItems));
			return newCartItems;
		});
	};

	const updateCart = (productId: string, quantity: number) => {
		setCartItems((prevCartItems) => {
			const existingItemIndex = prevCartItems.findIndex(
				(item) => item.productId === productId
			);
			if (existingItemIndex > -1) {
				if (quantity > 0) {
					prevCartItems[existingItemIndex].quantity = quantity;
				} else {
					prevCartItems.splice(existingItemIndex, 1);
				}
			} else if (quantity > 0) {
				prevCartItems.push({ productId, quantity });
			}
			localStorage.setItem("cart-items", JSON.stringify(prevCartItems));
			return [...prevCartItems];
		});
	};

	const removeFromCart = (productId: string) => {
		setCartItems((prevCartItems) => {
			const updatedCartItems = prevCartItems.filter(
				(item) => item.productId !== productId
			);
			localStorage.setItem("cart-items", JSON.stringify(updatedCartItems));
			return updatedCartItems;
		});
	};

	const clearCart = () => {
		setCartItems((prevCartItems) => {
			localStorage.removeItem("cart-items");
			return [];
		});
	};

	// Calculate the total number of items in the cart
	const totalItems = cartItems.reduce(
		(total, item) => total + item.quantity,
		0
	);

	return (
		<CartContext.Provider
			value={{
				cartItems,
				addToCart,
				updateCart,
				removeFromCart,
				clearCart,
				totalItems,
			}}
		>
			{children}
		</CartContext.Provider>
	);
};

export const useCart = () => {
	const context = useContext(CartContext);
	if (!context) {
		throw new Error("useCart must be used within a CartProvider");
	}
	return context;
};
