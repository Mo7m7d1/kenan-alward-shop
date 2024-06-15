const { PrismaClient } = require("@prisma/client");

const db = new PrismaClient();

async function seed() {
	// const categories = [
	// 	{
	// 		title: "ورود طبيعية",
	// 		description: "أجمل الورود الطبيعية المنسقة بعناية.",
	// 	},
	// 	{
	// 		title: "ورود صناعية",
	// 		description: "ورود صناعية فائقة الجودة تدوم طويلاً.",
	// 	},
	// 	{
	// 		title: "تشكيلات زهور",
	// 		description: "تشكيلات مميزة من الزهور والورود المتنوعة.",
	// 	},
	// 	{
	// 		title: "ورود موسمية",
	// 		description: "ورود موسمية متوفرة فقط خلال فترات معينة من السنة.",
	// 	},
	// 	{
	// 		title: "باقات ورود",
	// 		description: "باقات ورد جميلة تناسب جميع المناسبات.",
	// 	},
	// ];

	const products = [
		{
			title: "باقة ورود حمراء",
			description:
				"باقة من أجمل الورود الحمراء الطبيعية، مثالية للتعبير عن الحب.",
			images: [
				"https://www.fnp.ae/images/pr/m/v20240206130522/24-red-roses.jpg",
			],
			keywords: ["ورود", "طبيعية", "حب"],
			price: 150.0,
			discount: 10.0,
			stock: 20,
			isPhysical: true,
			isAvailable: true,
			isFeatured: true,
			categories: ["ورود طبيعية"],
		},
		{
			title: "وردة صناعية بيضاء",
			description: "وردة صناعية بيضاء بجودة عالية تدوم لسنوات.",
			images: [
				"https://m.media-amazon.com/images/I/71l4nxyFB1L._AC_UF1000,1000_QL80_.jpg",
			],
			keywords: ["ورود", "صناعية", "بيضاء"],
			price: 25.0,
			discount: 0.0,
			stock: 50,
			isPhysical: true,
			isAvailable: true,
			isFeatured: false,
			categories: ["ورود صناعية"],
		},
		{
			title: "تشكيلة زهور ملونة",
			description:
				"تشكيلة متنوعة من الزهور الطبيعية الملونة، مثالية لتزيين المنازل.",
			images: [
				"https://encrypted-tbn1.gstatic.com/images?q=tbn:ANd9GcRFlrTzeS4C2dmT3R8OEYM31IPwLc7lqvZE102ZZxNGN2-OF-Xx",
			],
			keywords: ["زهور", "ملونة", "تزيين"],
			price: 200.0,
			discount: 15.0,
			stock: 15,
			isPhysical: true,
			isAvailable: true,
			isFeatured: true,
			categories: ["تشكيلات زهور"],
		},
		{
			title: "ورود موسمية صفراء",
			description: "ورود صفراء موسمية، تتوفر فقط خلال فصل الربيع.",
			images: [
				"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRELXpTEmpkS4tQg5lnPGAp3CW5YnM-hNTutiOMtso4dFbxMt7MM5IW2rLl2WkXBiHQ4NM&usqp=CAU",
			],
			keywords: ["ورود", "موسمية", "صفراء"],
			price: 100.0,
			discount: 5.0,
			stock: 10,
			isPhysical: true,
			isAvailable: false,
			isFeatured: false,
			categories: ["ورود موسمية"],
		},
		{
			title: "باقة ورود مختلطة",
			description:
				"باقة من الورود المختلطة بألوان متنوعة، تناسب جميع المناسبات.",
			images: [
				"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR7hpVXy262Zzgn3gqRn8-msN_6iB_qZWNzWYYuzOZpEG5zsxTV9bbnMAjY_9J2Y1a78p8&usqp=CAU",
			],
			keywords: ["ورود", "طبيعية", "مختلطة"],
			price: 180.0,
			discount: 20.0,
			stock: 25,
			isPhysical: true,
			isAvailable: true,
			isFeatured: true,
			categories: ["باقات ورود"],
		},
	];

	try {
		// const response = await db.category.createMany({ data: categories });
		for (const p of products) {
			await db.product.create({
				data: {
					...p,
					categories: { connect: { title: p.categories[0] } },
				},
			});
		}
		// if (response.success) {
		console.log("seeded successfully");
		// } else {
		// 	console.error("Failed to seed", response.error);
		// }
	} catch (error) {
		console.error("Error seeding:", error);
	}
}

seed();
