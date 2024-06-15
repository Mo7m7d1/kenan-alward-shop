import { Mail } from "lucide-react";
import { Link } from "next-view-transitions";

export default function Footer() {
	return (
		<footer dir="rtl" className=" bg-gray-800 text-white">
			<div className="w-full max-w-5xl mx-auto grid grid-cols-4 items-start justify-center py-4 px-6 space-x-6">
				<div className="flex items-center gap-6 ml-3">
					<div className="relative">
						<img
							src="/images/logo.png"
							height={100}
							width={200}
							alt="كنان الورد"
							className="object-contain h-32 w-full"
						/>
					</div>
					<div className="flex flex-col space-y-4">
						<Link href={"kananal.ward2024@gmail.com"} prefetch={false}>
							<Mail className="h-6 w-6 text-white" />
						</Link>
						<Link
							href={"https://x.com/kananal.ward2024"}
							target="_blank"
							prefetch={false}
						>
							<TwitterIcon className="h-6 w-6 text-white" />
						</Link>
						<Link
							href={"https://www.instagram.com/kananal.ward2024"}
							target="_blank"
							prefetch={false}
						>
							<InstagramIcon className="h-6 w-6 text-white" />
						</Link>
						<Link
							href={`https://wa.me/+966551429774`}
							target="_blank"
							prefetch={false}
						>
							<WhatsAppIcon className="h-6 w-6 text-white" />
						</Link>
					</div>
				</div>
				<div className="flex flex-col space-y-2">
					<h3 className="font-bold">الشركة</h3>
					<Link
						href="/about"
						className="text-gray-300 hover:text-white"
						prefetch={false}
					>
						من نحن
					</Link>
				</div>
				<div className="flex flex-col space-y-2">
					<h3 className="font-bold">المساعدة</h3>
					<Link
						href={`https://wa.me/+966551429774`}
						target="_blank"
						prefetch={false}
						className="text-gray-300 hover:text-white"
					>
						الدعم
					</Link>
					<Link
						href="/contact"
						className="text-gray-300 hover:text-white"
						prefetch={false}
					>
						تواصل معنا
					</Link>
				</div>
				<div className="flex flex-col space-y-2">
					<h3 className="font-bold">استكشاف</h3>
					<Link
						href="/#services"
						className="text-gray-300 hover:text-white"
						prefetch={false}
					>
						الخدمات
					</Link>
					<Link
						href="/#products"
						className="text-gray-300 hover:text-white"
						prefetch={false}
					>
						المنتجات
					</Link>
					<Link
						href="/#categories"
						className="text-gray-300 hover:text-white"
						prefetch={false}
					>
						الأقسام
					</Link>
				</div>
				<div className="col-span-4 text-center mt-6">
					<p className="text-sm">{`جميع الحقوق محفوظة ${new Date().getFullYear()} \u00A9  كنان الورد.`}</p>
				</div>
			</div>
		</footer>
	);
}

function FacebookIcon(props: any) {
	return (
		<svg
			{...props}
			xmlns="http://www.w3.org/2000/svg"
			width="24"
			height="24"
			viewBox="0 0 20 20"
			fill="none"
			stroke="currentColor"
			strokeWidth="2"
			strokeLinecap="round"
			strokeLinejoin="round"
		>
			<path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
		</svg>
	);
}

function InstagramIcon(props: any) {
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
			<rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
			<path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
			<line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
		</svg>
	);
}

export function WhatsAppIcon(props: any) {
	return (
		<svg
			{...props}
			xmlns="http://www.w3.org/2000/svg"
			width="20"
			height="20"
			viewBox="2 2 22 24"
			fill="none"
			stroke="currentColor"
			strokeWidth="2"
			strokeLinecap="round"
			strokeLinejoin="round"
		>
			<path d="M16.01 0C7.163 0 0 7.16 0 15.999c0 3.123 1.027 6.032 2.787 8.41L.527 30.31c-.163.525.085 1.097.604 1.267.515.17 1.075-.083 1.237-.604l5.37-5.82c2.55 1.582 5.551 2.514 8.812 2.514C24.86 27.666 32 20.507 32 16c0-8.84-7.161-16-15.99-16zM16.01 25.932c-2.978 0-5.742-.937-8.012-2.514l-.574-.384-3.45 3.744.997-4.563-.396-.605c-1.637-2.5-2.603-5.043-2.603-7.603 0-7.075 5.763-12.834 12.84-12.834 6.712 0 12.353 5.287 12.353 12.002-.005 6.904-5.712 12.758-12.855 12.758zm6.842-10.12c-.373-.187-2.197-1.088-2.537-1.214-.343-.123-.594-.187-.846.188-.248.374-.974 1.213-1.195 1.463-.217.247-.435.276-.81.09-.375-.185-1.586-.587-3.025-1.87-1.117-.998-1.87-2.227-2.092-2.602-.217-.374-.023-.575.164-.762.168-.167.374-.434.562-.652.187-.218.248-.374.373-.622.123-.252.061-.466-.031-.652-.093-.188-.842-2.022-1.154-2.773-.303-.729-.61-.63-.842-.63-.218 0-.467-.03-.716-.03-.25 0-.653.093-.993.466-.34.372-1.298 1.265-1.298 3.088 0 1.823 1.327 3.588 1.514 3.838.186.247 2.62 3.955 6.345 5.534.887.376 1.58.598 2.12.76.892.28 1.706.24 2.34.147.714-.105 2.197-.898 2.506-1.764.31-.874.31-1.627.217-1.763-.092-.15-.34-.248-.713-.434z" />
		</svg>
	);
}

function TwitterIcon(props: any) {
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
			<path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z" />
		</svg>
	);
}
