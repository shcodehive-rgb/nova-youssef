const { PrismaClient } = require('@prisma/client');
const db = new PrismaClient();

async function main() {
    try {
        console.log("Checking Page model...");
        const pages = await db.page.findMany();
        console.log("Pages found:", pages.length);
    } catch (e) {
        console.error("Error accessing Page model:", e);
    } finally {
        await db.$disconnect();
    }
}

main();
