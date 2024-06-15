"use client"; // Error components must be Client Components

import { Button } from "@/components/ui/button";
import { useEffect } from "react";

export default function Error({
	error,
	reset,
}: {
	error: Error & { digest?: string };
	reset: () => void;
}) {
	useEffect(() => {
		// Log the error to an error reporting service
		console.error(error);
	}, [error]);

	return (
		<div className="flex justify-center items-center h-screen flex-col gap-5">
			<h2 className="text-red-500 text-lg font-semibold">حدث خطأ ما!</h2>
			<Button onClick={() => reset()}>إعادة المحاولة</Button>
		</div>
	);
}
