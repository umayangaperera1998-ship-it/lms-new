const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();
async function main() {
  const roles = await prisma.role.findMany();
  const userRoles = await prisma.userRole.findMany();
  console.log("Roles:", JSON.stringify(roles, null, 2));
  console.log("UserRoles:", JSON.stringify(userRoles, null, 2));
}
main().catch(console.error).finally(() => prisma.$disconnect());
