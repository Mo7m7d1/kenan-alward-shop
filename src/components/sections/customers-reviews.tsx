import { AvatarImage, AvatarFallback, Avatar } from "@/components/ui/avatar";

export default function CustomersReviews() {
	return (
		<section className="container mx-auto px-4 py-12 md:px-6">
			<div className="grid gap-8">
				<div className="text-center">
					<h2 className="text-3xl font-bold tracking-tight">آراء عملائنا</h2>
				</div>
				<div className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
					<div className="rounded-lg bg-white shadow-lg transition-shadow duration-300 hover:shadow-xl dark:bg-gray-950">
						<div className="p-6">
							<div className="mb-4 flex items-center">
								<Avatar className="ml-4 h-10 w-10">
									<AvatarImage alt="الصورة" src="/images/empty.svg" />
									<AvatarFallback>N</AvatarFallback>
								</Avatar>
								<div>
									<h3 className="font-semibold">نوره</h3>
									<div className="flex items-center text-yellow-500">
										<StarIcon className="h-5 w-5" />
										<StarIcon className="h-5 w-5" />
										<StarIcon className="h-5 w-5" />
										<StarIcon className="h-5 w-5" />
										<StarIcon className="h-5 w-5 text-gray-300 dark:text-gray-600" />
									</div>
								</div>
							</div>
							<p className="leading-relaxed text-gray-500 dark:text-gray-400">
								"أحلى ورد، التعامل راقي والتوصيل سريع."
							</p>
						</div>
					</div>
					<div className="rounded-lg bg-white shadow-lg transition-shadow duration-300 hover:shadow-xl dark:bg-gray-950">
						<div className="p-6">
							<div className="mb-4 flex items-center">
								<Avatar className="ml-4 h-10 w-10">
									<AvatarImage alt="avatar image" src="/images/empty.svg" />
									<AvatarFallback>A</AvatarFallback>
								</Avatar>
								<div>
									<h3 className="font-semibold">أحمد خالد</h3>
									<div className="flex items-center text-yellow-500">
										<StarIcon className="h-5 w-5" />
										<StarIcon className="h-5 w-5" />
										<StarIcon className="h-5 w-5" />
										<StarIcon className="h-5 w-5" />
										<StarIcon className="h-5 w-5 text-gray-300 dark:text-gray-600" />
									</div>
								</div>
							</div>
							<p className="leading-relaxed text-gray-500 dark:text-gray-400">
								"ورودهم مره جميله وخدمة العملاء ممتازة."
							</p>
						</div>
					</div>
					<div className="rounded-lg bg-white shadow-lg transition-shadow duration-300 hover:shadow-xl dark:bg-gray-950">
						<div className="p-6">
							<div className="mb-4 flex items-center">
								<Avatar className="ml-4 h-10 w-10">
									<AvatarImage alt="الصورة" src="/images/empty.svg" />
									<AvatarFallback>S</AvatarFallback>
								</Avatar>
								<div>
									<h3 className="font-semibold">سالم</h3>
									<div className="flex items-center text-yellow-500">
										<StarIcon className="h-5 w-5" />
										<StarIcon className="h-5 w-5" />
										<StarIcon className="h-5 w-5" />
										<StarIcon className="h-5 w-5" />
										<StarIcon className="h-5 w-5" />
									</div>
								</div>
							</div>
							<p className="leading-relaxed text-gray-500 dark:text-gray-400">
								"أحب أطلب منهم دايمًا، الورد فريش وريحتها حلوة."
							</p>
						</div>
					</div>
				</div>
			</div>
		</section>
	);
}

function StarIcon(props: any) {
	return (
		<svg
			{...props}
			xmlns="http://www.w3.org/2000/svg"
			width="24"
			height="24"
			viewBox="0 0 24 24"
			fill="none"
			stroke="currentColor"
			strokeWidth="2"
			strokeLinecap="round"
			strokeLinejoin="round"
		>
			<polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
		</svg>
	);
}
