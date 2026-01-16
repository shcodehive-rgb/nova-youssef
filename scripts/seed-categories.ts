const { PrismaClient } = require("@prisma/client");

const database = new PrismaClient();

async function main() {
    try {
        const categories = [
            { name: "2 Bac SM" },
            { name: "2 Bac PC" },
            { name: "1 Bac" },
            { name: "Faculté" },
            { name: "Pack Wataniyat" },
            { name: "Examens" },
        ];

        console.log("Seeding categories...");

        for (const category of categories) {
            await database.category.upsert({
                where: { name: category.name },
                update: {},
                create: { name: category.name },
            });
        }

        console.log("Categories seeded successfully");
    } catch (error) {
        console.log("Error seeding categories:", error);
    } finally {
        await database.$disconnect();
    }
}

main();
