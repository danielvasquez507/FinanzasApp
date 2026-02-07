
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function main() {
    const logs = await prisma.auditLog.findMany({
        take: 10,
        orderBy: { createdAt: 'desc' }
    });
    logs.forEach(l => {
        console.log(`Log ID: ${l.id}, Action: ${l.action}, Entity: ${l.entity}, CreatedAt: ${l.createdAt}`);
        console.log(`Details: ${l.details}`);
        console.log('---');
    });
}

main().catch(console.error).finally(() => prisma.$disconnect());
