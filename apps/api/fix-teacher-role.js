const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();
async function main() {
  const teacherUser = await prisma.user.findFirst({ where: { email: 'teacher@futureacademy.lk' } });
  const teacherRole = await prisma.role.findFirst({ where: { name: 'TEACHER' } });
  
  if (teacherUser && teacherRole) {
    await prisma.userRole.upsert({
      where: { userId_roleId: { userId: teacherUser.id, roleId: teacherRole.id } },
      create: { userId: teacherUser.id, roleId: teacherRole.id },
      update: {}
    });
    console.log("Successfully linked teacher user to TEACHER role.");
  } else {
    console.log("Teacher user or role not found.", !!teacherUser, !!teacherRole);
  }
}
main().catch(console.error).finally(() => prisma.$disconnect());
