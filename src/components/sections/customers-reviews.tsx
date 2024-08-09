import React from "react";
import { AvatarImage, AvatarFallback, Avatar } from "@/components/ui/avatar";

const CustomersReviews: React.FC = () => {
	const reviews = [
		{
			avatarSrc: "/images/placeholder.svg",
			avatarFallback: "N",
			name: "نوره",
			rating: 3,
			comment: "أحلى ورد، التعامل راقي والتوصيل سريع.",
		},
		{
			avatarSrc: "/images/placeholder.svg",
			avatarFallback: "A",
			name: "أحمد خالد",
			rating: 4,
			comment: "ورودهم مره جميله وخدمة العملاء ممتازة.",
		},
		{
			avatarSrc: "/images/placeholder.svg",
			avatarFallback: "S",
			name: "سالم",
			rating: 5,
			comment: "أحب أطلب منهم دايمًا، الورد فريش وريحتها حلوة.",
		},
	];

	return (
		<section className="container mx-auto px-4 py-12 md:px-6">
			<div className="grid gap-8">
				<div className="text-center">
					<h2 className="text-3xl font-bold tracking-tight">آراء عملائنا</h2>
				</div>
				<div className="grid grid-cols-1 gap-6 md:grid-cols-3">
					{reviews.map((review, index) => (
						<Review
							key={index}
							avatarSrc={review.avatarSrc}
							avatarFallback={review.avatarFallback}
							name={review.name}
							rating={review.rating}
							comment={review.comment}
						/>
					))}
				</div>
			</div>
		</section>
	);
};

export default CustomersReviews;

interface ReviewProps {
	avatarSrc: string;
	avatarFallback: string;
	name: string;
	rating: number;
	comment: string;
}

export const Review: React.FC<ReviewProps> = ({
	avatarSrc,
	avatarFallback,
	name,
	rating,
	comment,
}) => {
	return (
		<div className="rounded-lg bg-white shadow-lg transition-shadow duration-300 hover:shadow-xl dark:bg-gray-950">
			<div className="p-6">
				<div className="mb-4 flex items-center">
					<Avatar className="ml-4 h-10 w-10">
						<AvatarImage alt="الصورة" src={avatarSrc} />
						<AvatarFallback>{avatarFallback}</AvatarFallback>
					</Avatar>
					<div>
						<h3 className="font-semibold">{name}</h3>
						<div className="flex items-center text-yellow-500">
							{[...Array(5)].map((_, i) => (
								<StarIcon
									key={i}
									className={`h-5 w-5 ${
										i < rating
											? "fill-yellow-500"
											: "text-gray-300 dark:text-gray-600"
									}`}
								/>
							))}
						</div>
					</div>
				</div>
				<p className="leading-relaxed text-gray-500 dark:text-gray-400">
					"{comment}"
				</p>
			</div>
		</div>
	);
};

const StarIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
	<svg
		xmlns="http://www.w3.org/2000/svg"
		width="24"
		height="24"
		viewBox="0 0 24 24"
		fill="none"
		stroke="currentColor"
		strokeWidth="2"
		strokeLinecap="round"
		strokeLinejoin="round"
		{...props}
	>
		<polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
	</svg>
);
