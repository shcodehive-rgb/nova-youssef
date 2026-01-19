const net = require('net');

const configs = [
    { host: 'aws-0-us-west-2.pooler.supabase.com', port: 5432, name: 'Pooler Session (5432)' },
    { host: 'aws-0-us-west-2.pooler.supabase.com', port: 6543, name: 'Pooler Transaction (6543)' },
    { host: 'db.arqqwujcpzkounyucdsx.supabase.co', port: 5432, name: 'Direct DB (5432) - Retest' }
];

async function testConnection(config) {
    return new Promise((resolve) => {
        console.log(`Testing ${config.name} (${config.host}:${config.port})...`);
        const socket = new net.Socket();
        const start = Date.now();

        socket.setTimeout(5000);

        socket.on('connect', () => {
            console.log(`✅ Connected to ${config.name} in ${Date.now() - start}ms`);
            socket.destroy();
            resolve(true);
        });

        socket.on('timeout', () => {
            console.log(`❌ Timeout connecting to ${config.name}`);
            socket.destroy();
            resolve(false);
        });

        socket.on('error', (err) => {
            console.log(`❌ Error connecting to ${config.name}: ${err.message}`);
            resolve(false);
        });

        socket.connect(config.port, config.host);
    });
}

async function run() {
    for (const config of configs) {
        await testConnection(config);
    }
}

run();
