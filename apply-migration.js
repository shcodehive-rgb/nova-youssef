const { Client } = require('pg');
const fs = require('fs');
const path = require('path');

const config = {
    connectionString: "postgresql://postgres.arqqwujcpzkounyucdsx:OS1crHx8HMrXiAOl@aws-0-us-west-2.pooler.supabase.com:6543/postgres?pgbouncer=true&connect_timeout=20",
    ssl: { rejectUnauthorized: false }
};

async function runMigration() {
    console.log("Reading init_db.sql...");
    const sql = fs.readFileSync(path.join(__dirname, 'init_db.sql'), 'utf8');

    console.log("Connecting to DB (6543)...");
    const client = new Client(config);

    try {
        await client.connect();
        console.log("✅ Connected! Executing SQL...");

        // Split commands by semicolon to avoid single-transaction issues if any
        // Actually, pg 'query' can execute multiple statements if passed as one string usually.
        // But let's try mostly as one block or split if needed.
        // For safety, let's run it as one big block first.

        await client.query(sql);

        console.log("✅ MIGRATION SUCCESS! Tables should be created.");
        await client.end();
    } catch (err) {
        console.error("❌ Migration Failed:", err.message);
        client.end();
    }
}

runMigration();
