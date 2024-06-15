"use client";

import { useEffect, useState } from "react";
import { buttonVariants } from "@/components/ui/button";
import LoadingSpinner from "@/components/shared/loading-spinner";
import { getCartProducts } from "@/server/models/product";
import { Product } from "@prisma/client";
import { formatMoney } from "@/lib/utils";
import {
	Card,
	CardContent,
	CardFooter,
	CardHeader,
} from "@/components/ui/card";
import { Link } from "next-view-transitions";
import Image from "next/image";
import CartButton from "../[product]/components/cart-button";
import { useSession } from "next-auth/react";
import { LoginModal } from "@/components/shared/login-modal";
import { useCart } from "@/components/shared/cart-context";

const TAX_RATE = 0.07; // 7% tax

const fetchProducts = async (productIds: string[]) => {
	if (productIds.length === 0) return [];
	const products = await getCartProducts(productIds);
	return products;
};

const ProductCard = ({ product }: { product: Product }) => {
	return (
		<Card>
			<CardContent className="grid grid-cols-10 gap-4 p-3">
				<div className="relative w-full col-span-4">
					<Link href={`/${product?.id}`}>
						<Image
							className="rounded-lg object-cover"
							src={product?.images[0]}
							alt="item image"
							fill
						/>
					</Link>
				</div>
				<div className="col-span-6 block space-y-2">
					<Link href={`/products/${product?.id}`}>
						<h2>{product?.title}</h2>
					</Link>
					<p>{formatMoney(product.price)}</p>
					<div className="flex justify-end">
						<CartButton productId={product.id} stock={product.stock} />
					</div>
				</div>
			</CardContent>
		</Card>
	);
};

const Cart = () => {
	const [products, setProducts] = useState<Product[]>([]);
	const { status } = useSession();
	const [loading, setLoading] = useState(false);
	const { cartItems } = useCart();
	const [totals, setTotals] = useState({
		totalPrice: 0,
		totalDiscount: 0,
		tax: 0,
		finalTotal: 0,
	});

	useEffect(() => {
		const loadProducts = async () => {
			setLoading(true);
			const productIds = cartItems.map((item) => item.productId);
			const fetchedProducts = await fetchProducts(productIds);
			setProducts(fetchedProducts!);
			setLoading(false);
		};

		if (cartItems.length > 0) {
			loadProducts();
		} else {
			setProducts([]);
		}
	}, [cartItems.length]);

	useEffect(() => {
		const calculateTotals = () => {
			let totalPrice = 0;
			let totalDiscount = 0;

			products.forEach((product) => {
				const cartItem = cartItems.find(
					(item) => item.productId === product.id
				);
				if (cartItem) {
					const productPrice = product.price * cartItem.quantity;
					const productDiscount =
						((product.discount || 0) / 100) * product.price * cartItem.quantity;

					totalPrice += productPrice;
					totalDiscount += productDiscount;
				}
			});

			const priceAfterDiscount = totalPrice - totalDiscount;
			const tax = priceAfterDiscount * TAX_RATE;
			const finalTotal = priceAfterDiscount + tax;

			setTotals({ totalPrice, totalDiscount, tax, finalTotal });
		};

		calculateTotals();
	}, [cartItems, products]);

	return (
		<>
			<div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
				{loading && <LoadingSpinner />}
				{products?.length > 0 ? (
					products?.map((product) => (
						<ProductCard key={product.id} product={product} />
					))
				) : (
					<div className="flex flex-col gap-5 justify-center items-center mt-20">
						<p className="text-lg font-semibold">سلة المنتجات فارغة...</p>
						<Link className={buttonVariants({ variant: "link" })} href={`/`}>
							قم باضافة منتجات من هنا
						</Link>
					</div>
				)}
			</div>

			{products?.length > 0 && (
				<Card>
					<CardHeader className="p-4 pb-0">
						<h2 className="font-bold tracking-tight">الفاتورة</h2>
					</CardHeader>
					<CardContent className="p-4 text-sm">
						<div className="block space-y-[1vh]">
							<div className="flex justify-between">
								<p>المبلغ الإجمالي</p>
								<h3>{formatMoney(totals.totalPrice)}</h3>
							</div>
							<div className="flex justify-between">
								<p>مبلغ الخصم</p>
								<h3>{formatMoney(totals.totalDiscount)}</h3>
							</div>
							<div className="flex justify-between">
								<p>مبلغ الضريبة</p>
								<h3>{formatMoney(totals.tax)}</h3>
							</div>
						</div>
						<div className="my-4 border-b border-gray-200"></div>
						<div className="flex justify-between">
							<p>المبلغ المستحق</p>
							<h3 className="font-semibold">
								{formatMoney(totals.finalTotal)}
							</h3>
						</div>
					</CardContent>
					<CardFooter className="flex justify-end px-3">
						{status === "authenticated" ? (
							<Link
								href={`/checkout?payable=${totals.finalTotal}&total=${totals.totalPrice}&discount=${totals.totalDiscount}`}
								className={buttonVariants({ className: "font-bold w-full" })}
							>
								الدفع
							</Link>
						) : (
							<LoginModal callbackUrl="checkout" />
						)}
					</CardFooter>
				</Card>
			)}
		</>
	);
};

export default Cart;
