import { Flower, Truck, Cake } from "lucide-react";

export default function Services() {
	return (
		<section id="services">
			<div className="container mx-auto px-4 md:px-6">
				<div className="flex flex-col items-center space-y-4 text-center">
					<div className="space-y-2">
						<h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
							خدماتنا
						</h2>
					</div>
				</div>
				<div className="mt-10 grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3">
					<ServiceCard
						title="ورد"
						description="نوفر ورد روز هولندي وبيبي روز بطريقة جميلة سواء بوكس ورد وكيك أو بوكيه ورد وكيك. يتوفر جميع أنواع الورد حسب الطلب بأسعار تنافسية."
						icon={<Flower size={48} />}
					/>
					<ServiceCard
						title="الشحن"
						description="يتم التوصيل في أقل من 24 ساعة لمنطقة الرياض وضواحيها، وجميع أنحاء المملكة خلال 1-3 أيام."
						icon={<Truck size={48} />}
					/>
					<ServiceCard
						title="الكيك"
						description="نوفر جميع أشكال الكيكات، مخبوزات إيطالية ذات جودة عالية، يتم التحضير حسب الطلب وبنكهات متعددة، ويقدم في بوكس جميل."
						icon={<Cake size={48} />}
					/>
				</div>
			</div>
		</section>
	);
}

type ServiceCardProps = {
	title: string;
	description: string;
	icon: JSX.Element;
};

function ServiceCard({ title, description, icon }: ServiceCardProps) {
	return (
		<div className="flex flex-col items-center space-y-4 rounded-lg bg-white p-6 text-center shadow-lg dark:bg-gray-950">
			{icon}
			<h3 className="text-lg font-semibold">{title}</h3>
			<p className="text-gray-500 dark:text-gray-400">{description}</p>
		</div>
	);
}
