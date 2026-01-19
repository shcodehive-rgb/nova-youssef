const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function main() {
    console.log("Checking SiteConfig data...");
    const config = await prisma.siteConfig.findFirst();
    if (config) {
        console.log("✅ SiteConfig Found:");
        console.log(" - ID:", config.id);
        console.log(" - UserID (in DB):", config.userId);
        console.log(" - SocialLinks:", JSON.stringify(config.socialLinks, null, 2));
    } else {
        console.log("❌ No SiteConfig found in DB.");
    }
}

main()
    .catch(e => console.error(e))
    .finally(() => prisma.$disconnect());
