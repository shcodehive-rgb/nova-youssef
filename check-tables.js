const { Client } = require('pg');

const config = {
    connectionString: "postgresql://postgres.arqqwujcpzkounyucdsx:OS1crHx8HMrXiAOl@aws-0-us-west-2.pooler.supabase.com:6543/postgres?pgbouncer=true&connect_timeout=10",
    ssl: { rejectUnauthorized: false }
};

async function checkTable() {
    console.log("Checking if tables exist via Transaction Pooler (6543)...");
    const client = new Client(config);
    try {
        await client.connect();

        // Simple query to check if table exists
        const res = await client.query(`
      SELECT EXISTS (
        SELECT FROM information_schema.tables 
        WHERE  table_schema = 'public'
        AND    table_name   = 'SiteConfig'
      );
    `);

        const exists = res.rows[0].exists;
        console.log(`Table 'SiteConfig' exists: ${exists ? '✅ YES' : '❌ NO'}`);

        if (exists) {
            console.log("--> Access Successful. You do NOT need to run 'prisma db push'.");
        } else {
            console.log("--> Tables missing. Please run the SQL script in Supabase Dashboard.");
        }

        await client.end();
    } catch (err) {
        console.log(`❌ Connection Failed: ${err.message}`);
    }
}

checkTable();
