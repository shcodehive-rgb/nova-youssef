const { Client } = require('pg');

// OLD Database Config (from first view of .env)
const configOld = {
    connectionString: "postgresql://postgres.lbstfsgsxjzdmokzrcza:hROxXoUNjLi76Lho@aws-1-eu-west-1.pooler.supabase.com:6543/postgres?pgbouncer=true&connect_timeout=10",
    ssl: { rejectUnauthorized: false }
};

const configNew = {
    connectionString: "postgresql://postgres.arqqwujcpzkounyucdsx:hROxXoUNjLi76Lho@aws-0-us-west-2.pooler.supabase.com:6543/postgres?pgbouncer=true&connect_timeout=10",
    ssl: { rejectUnauthorized: false }
};

async function test(name, config) {
    console.log(`\nTesting ${name}...`);
    const client = new Client(config);
    try {
        await client.connect();
        console.log(`✅ ${name}: Authenticated!`);
        const res = await client.query('SELECT 1 as val');
        console.log(`✅ ${name}: Query Result set matches.`);
        await client.end();
        return true;
    } catch (err) {
        console.log(`❌ ${name}: Failed - ${err.message} (${err.code})`);
        return false;
    }
}

async function run() {
    console.log("--- DIAGNOSTIC: Checking Old vs New DB Credentials ---");
    await test('OLD Database (lbstfsgs...)', configOld);
    await test('NEW Database (arqqwuj...)', configNew);
}

run();
