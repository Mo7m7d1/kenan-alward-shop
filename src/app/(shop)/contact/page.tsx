import { WhatsAppIcon } from "@/components/sections/footer";
import { Phone, Mail, Instagram, Twitter } from "lucide-react";
import { Link } from "next-view-transitions";

export const metadata = {
	title: "كنان الورد: تواصل معنا",
	description: "تواصل مع فريق كنان الورد للحصول على أفضل خدمة عملاء ودعم.",
};

export default function ContactPage() {
	return (
		<div className="p-5 text-center">
			<h1 className="text-3xl font-bold mb-5">تواصل معنا</h1>
			<p className="mb-10">
				بفخر نقدم لكم خدمة العملاء الراقية لـ "نسيم الزهور". نحن هنا لتلبية
				احتياجاتكم وتقديم الدعم الكامل. للتواصل معنا، يرجى استخدام الأرقام
				التالية للاتصال المباشر أو التواصل معنا عبر البريد الإلكتروني أو
				حساباتنا على وسائل التواصل الاجتماعي المدرجة أدناه. نحن هنا لخدمتكم بكل
				احترافية وتميز.
			</p>
			<div className="flex flex-col sm:flex-row justify-center flex-wrap gap-10">
				<Link
					href={`tel:+966551429774`}
					prefetch={false}
					className="text-center"
				>
					<Phone size={36} className="mx-auto mb-3" />
					<h2 className="text-xl">الرقم الموحد: 9774 142 55 966+</h2>
				</Link>
				<Link
					href={`https://wa.me/+966551429774`}
					target="_blank"
					prefetch={false}
					className="text-center"
				>
					<WhatsAppIcon className="mx-auto mb-3 h-8 w-16" />
					<h2 className="text-xl">واتساب: 9774 142 55 966+</h2>
				</Link>
				<Link
					href={"mailto:kananal.ward2024@gmail.com"}
					prefetch={false}
					className="text-center"
				>
					<Mail size={36} className="mx-auto mb-3" />
					<h2 className="text-xl">الدعم: kananal.ward2024@gmail.com</h2>
				</Link>
				<Link
					href={"https://www.instagram.com/kananal.ward2024"}
					target="_blank"
					prefetch={false}
					className="text-center"
				>
					<Instagram size={36} className="mx-auto mb-3" />
					<h2 className="text-xl">إنستجرام</h2>
				</Link>
				<Link
					href={"https://x.com/kananal.ward2024"}
					target="_blank"
					prefetch={false}
					className="text-center"
				>
					<Twitter size={36} className="mx-auto mb-3" />
					<h2 className="text-xl">إكس</h2>
				</Link>
			</div>
			<p className="mt-10">
				تفضلوا بالتواصل معنا لأي استفسارات أو مساعدة تحتاجونها.
			</p>
		</div>
	);
}
