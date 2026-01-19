const { Client } = require('pg');

const config = {
    connectionString: "postgresql://postgres.arqqwujcpzkounyucdsx:OS1crHx8HMrXiAOl@aws-0-us-west-2.pooler.supabase.com:6543/postgres?pgbouncer=true&connect_timeout=20",
    ssl: { rejectUnauthorized: false }
};

async function runMigration() {
    console.log("Connecting to DB (6543)...");
    const client = new Client(config);

    try {
        await client.connect();
        console.log("✅ Connected! Applying Pages & Contact Schema...");

        // Add contactEmail to SiteConfig
        await client.query(`ALTER TABLE "SiteConfig" ADD COLUMN IF NOT EXISTS "contactEmail" TEXT;`);
        console.log("✅ Added contactEmail to SiteConfig");

        // Create Page Table
        // Note: Manual CREATE TABLE if not exists
        const createPageTable = `
      CREATE TABLE IF NOT EXISTS "Page" (
        "id" TEXT NOT NULL,
        "title" TEXT NOT NULL,
        "slug" TEXT NOT NULL,
        "content" TEXT NOT NULL,
        "isPublished" BOOLEAN NOT NULL DEFAULT false,
        "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
        "updatedAt" TIMESTAMP(3) NOT NULL,
        CONSTRAINT "Page_pkey" PRIMARY KEY ("id")
      );
    `;
        await client.query(createPageTable);
        console.log("✅ Created Page table");

        // Create Unique Index on slug if not exists
        // PG doesn't support "CREATE UNIQUE INDEX IF NOT EXISTS" easily in all versions, 
        // but we can try catch or just use standard syntax if 9.5+
        try {
            await client.query(`CREATE UNIQUE INDEX "Page_slug_key" ON "Page"("slug");`);
            console.log("✅ Created unique index on Page(slug)");
        } catch (e) {
            if (e.code === '42P07') { // duplicate_table (relation already exists)
                console.log("ℹ️ Index Page_slug_key already exists");
            } else {
                throw e;
            }
        }

        await client.end();
    } catch (err) {
        console.error("❌ Migration Failed:", err.message);
        client.end();
    }
}

runMigration();
