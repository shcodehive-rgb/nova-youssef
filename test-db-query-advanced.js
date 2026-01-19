const { Client } = require('pg');

// Variation 1: Session Pooler (5432) with rejectUnauthorized: false
// Note: pg module uses rejectUnauthorized in ssl config object for 'no-verify' equivalent
const configSession = {
    connectionString: "postgresql://postgres.arqqwujcpzkounyucdsx:hROxXoUNjLi76Lho@aws-0-us-west-2.pooler.supabase.com:5432/postgres?connect_timeout=10",
    ssl: { rejectUnauthorized: false }
};

// Variation 2: Transaction Pooler (6543) with rejectUnauthorized: false
const configTransaction = {
    connectionString: "postgresql://postgres.arqqwujcpzkounyucdsx:hROxXoUNjLi76Lho@aws-0-us-west-2.pooler.supabase.com:6543/postgres?connect_timeout=10",
    ssl: { rejectUnauthorized: false }
};

async function test(name, config) {
    console.log(`\nTesting ${name}...`);
    const client = new Client(config);
    try {
        await client.connect();
        console.log(`✅ ${name}: Authenticated!`);
        const res = await client.query('SELECT 1 as val');
        console.log(`✅ ${name}: Query Result:`, res.rows[0]);
        await client.end();
    } catch (err) {
        console.log(`❌ ${name}: Failed - ${err.message} (${err.code})`);
    }
}

async function run() {
    await test('Session Pooler (5432, No SSL Verify)', configSession);
    await test('Transaction Pooler (6543, No SSL Verify)', configTransaction);
}

run();
