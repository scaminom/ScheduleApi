const { PrismaClient } = require('@prisma/client')
const prisma = new PrismaClient()

beforeEach(async () => {
  const tablenames = await prisma.$queryRaw`
    SELECT tablename FROM pg_tables WHERE schemaname='public'
  `

  for (const { tablename } of tablenames) {
    if (tablename !== '_prisma_migrations') {
      try {
        await prisma.$executeRawUnsafe(
          `TRUNCATE TABLE "public"."${tablename}" RESTART IDENTITY CASCADE;`,
        )
      } catch (error) {
        console.error(`Error truncating table ${tablename}:`, error)
      }
    }
  }
})

afterAll(async () => {
  await prisma.$disconnect()
})
