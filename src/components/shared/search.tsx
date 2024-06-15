"use client";

import * as React from "react";
import { useState, useEffect, ChangeEvent } from "react";
import { debounce } from "lodash";
import { Input } from "../ui/input";
import { Card, CardContent } from "../ui/card";
import { formatMoney } from "@/lib/utils";
import { searchProducts } from "@/server/models/product";
import LoadingSpinner from "./loading-spinner";
import Link from "next/link";

interface Product {
	id: string;
	title: string;
	image: string;
	price: number;
}

interface SearchProps {
	closeModal: () => void;
}

export default function Search({ closeModal }: SearchProps) {
	const [query, setQuery] = useState<string>("");
	const [results, setResults] = useState<Product[]>([]);
	const [loading, setLoading] = useState<boolean>(false);
	const [searched, setSearched] = useState<boolean>(false); // Track if search has been conducted

	const handleSearch = debounce(async (query: string) => {
		if (query.length > 2) {
			setLoading(true);
			const products = await searchProducts(query);
			setResults(products || []);
			setLoading(false);
			setSearched(true); // Update searched state after search is conducted
		} else {
			setResults([]);
			setLoading(false);
			setSearched(false); // Reset searched state if query is less than 3 characters
		}
	}, 300); // 300ms debounce

	useEffect(() => {
		if (query.length > 2) {
			handleSearch(query);
		} else {
			setResults([]);
			setSearched(false); // Reset searched state if query is less than 3 characters
		}
	}, [query]);

	const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
		setQuery(e.target.value);
	};

	const handleClickProduct = () => {
		closeModal(); // Close the modal when a product is clicked
	};

	return (
		<div className="p-5">
			<div className="max-w-md mx-auto">
				<Input
					type="text"
					placeholder="ابحث عن المنتجات..."
					value={query}
					onChange={handleInputChange}
				/>
			</div>
			<div className="mt-5 flex flex-col gap-4">
				{loading ? (
					<div className="flex justify-center">
						<LoadingSpinner />
					</div>
				) : results.length === 0 && searched ? ( // Display message only if searched is true
					<p className="text-center text-gray-500">لا توجد نتائج للبحث</p>
				) : (
					results.map((product) => (
						<ProductCard
							key={product.id}
							product={product}
							onClick={handleClickProduct}
						/>
					))
				)}
			</div>
		</div>
	);
}

interface ProductCardProps {
	product: Product;
	onClick: () => void;
}

function ProductCard({ product, onClick }: ProductCardProps) {
	return (
		<Link href={`/${product.id}`} prefetch>
			<Card className="p-0 h-32 shadow border hover:scale-[102%] transition-all duration-200">
				<CardContent className="flex gap-3 p-0 relative" onClick={onClick}>
					<img
						src={product.image}
						alt={product.title}
						className="w-32 h-32 object-cover mb-3 rounded-md"
					/>
					<h3 className="text-[17px] font-semibold pt-4">{product.title}</h3>
					<span className="text-sm font-semibold absolute left-3 bottom-5">
						{formatMoney(product.price)}
					</span>
				</CardContent>
			</Card>
		</Link>
	);
}
