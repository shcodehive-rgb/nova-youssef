const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();

async function main() {
    console.log("Testing Prisma Client Connection...");
    console.log("URL:", process.env.DATABASE_URL);
    // Note: process.env might not be populated if we don't load dotenv, 
    // but Prisma loads .env automatically.

    try {
        const list = await prisma.siteConfig.findMany();
        console.log("✅ SiteConfig accessible. Count:", list.length);
    } catch (e) {
        console.error("❌ Prisma Error:", e);
    } finally {
        await prisma.$disconnect();
    }
}

main();
