const { Client } = require('pg');

const connectionString = "postgresql://postgres.arqqwujcpzkounyucdsx:hROxXoUNjLi76Lho@aws-0-us-west-2.pooler.supabase.com:5432/postgres?connect_timeout=60&sslmode=require";

const client = new Client({
    connectionString: connectionString,
});

async function run() {
    try {
        console.log("Connecting with pg client...");
        await client.connect();
        console.log("✅ Authenticated!");

        const res = await client.query('SELECT 1 as hello');
        console.log("✅ Query Result:", res.rows[0]);

        await client.end();
    } catch (err) {
        console.error("❌ Connection failed!");
        console.error("Code:", err.code);
        console.error("Message:", err.message);
        console.error("Stack:", err.stack);
    }
}

run();
