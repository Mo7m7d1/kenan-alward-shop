const { PrismaClient } = require("@prisma/client");
const { hashSync } = require("bcrypt");

const db = new PrismaClient();

async function seed() {
	try {
		// seed user
		await db.user.create({
			data: {
				email: "admin@gmail.com",
				password: hashSync("admin", 10),
			},
		});

		console.log("seeded successfully");
	} catch (error) {
		console.error("Error seeding:", error);
	}
}

seed();
