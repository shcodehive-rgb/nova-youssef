
import { PrismaClient } from '@prisma/client'

// Manually using the DIRECT_URL (port 5432) from the .env file content we read earlier
const connectionString = "postgresql://postgres.lbstfsgsxjzdmokzrcza:VYC9K3xkkm0dmnI8@aws-1-eu-west-1.pooler.supabase.com:5432/postgres"

const prisma = new PrismaClient({
    datasources: {
        db: {
            url: connectionString,
        },
    },
})

async function main() {
    try {
        console.log('Testing connection to port 5432...')
        await prisma.$connect()
        console.log('Connection successful to port 5432!')
        const count = await prisma.course.count()
        console.log(`Found ${count} courses.`)
    } catch (e) {
        console.error('Connection failed:', e)
    } finally {
        await prisma.$disconnect()
    }
}

main()
