const { Client } = require('pg');

// Use Transaction Pooler (6543)
const config = {
    connectionString: "postgresql://postgres.arqqwujcpzkounyucdsx:OS1crHx8HMrXiAOl@aws-0-us-west-2.pooler.supabase.com:6543/postgres?pgbouncer=true&connect_timeout=20",
    ssl: { rejectUnauthorized: false }
};

async function runMigration() {
    console.log("Connecting to DB (6543)...");
    const client = new Client(config);

    try {
        await client.connect();
        console.log("✅ Connected! Adding Footer columns...");

        // Check if columns exist first to avoid error? Or just ALTER.
        // simpler to just try ALTER, catch error if they exist.

        const sql = `
      ALTER TABLE "SiteConfig" ADD COLUMN IF NOT EXISTS "footerCopyright" TEXT;
      ALTER TABLE "SiteConfig" ADD COLUMN IF NOT EXISTS "footerLinks" JSONB;
    `;

        await client.query(sql);

        console.log("✅ SCHEMA UPDATE SUCCESS! Columns added.");
        await client.end();
    } catch (err) {
        console.error("❌ Migration Failed:", err.message);
        client.end();
    }
}

runMigration();
