"use client";

import * as React from "react";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
	Dialog,
	DialogContent,
	DialogHeader,
	DialogTitle,
	DialogTrigger,
} from "@/components/ui/dialog";
import { SearchIcon, X } from "lucide-react";
import Search from "./search";

export default function SearchModal() {
	const [isOpen, setIsOpen] = useState(false);

	const openModal = () => {
		setIsOpen(true);
	};

	const closeModal = () => {
		setIsOpen(false);
	};

	return (
		<Dialog open={isOpen} onOpenChange={setIsOpen}>
			<DialogTrigger asChild>
				<Button variant={"ghost"} onClick={openModal}>
					<SearchIcon />
				</Button>
			</DialogTrigger>
			<DialogContent className="max-w-[375px] sm:max-w-md px-0">
				<DialogHeader>
					<DialogTitle className="text-center">ابحث في المنتجات</DialogTitle>
				</DialogHeader>
				<Search closeModal={closeModal} />
			</DialogContent>
		</Dialog>
	);
}
