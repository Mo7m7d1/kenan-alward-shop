export function writeLocalCart(items: any) {
	window.localStorage.setItem("cart-items", JSON.stringify(items));
}

export function clearLocalCart() {
	window.localStorage.removeItem("cart-items");
}

type CartItems = {
	productId: string;
	quantity: number;
}[];

export function getLocalCart() {
	if (typeof window !== "undefined" && window.localStorage) {
		try {
			const cartItems: CartItems = JSON.parse(
				localStorage.getItem("cart-items") || "[]"
			);
			// const productIds = cartItems.map((item) => item.productId);
			return cartItems;
		} catch (error) {
			// writeLocalCart({ items: [] });
			// return { items: [] };
			console.log(error);
		}
	}
}

export function getCountInCart({ cartItems, productId }: any) {
	try {
		for (let i = 0; i < cartItems.length; i++) {
			if (cartItems[i]?.productId === productId) {
				return cartItems[i]?.count;
			}
		}

		return 0;
	} catch (error) {
		console.error({ error });
		return 0;
	}
}
