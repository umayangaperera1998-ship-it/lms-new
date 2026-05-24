import { PrismaClient } from '@prisma/client';
import * as bcrypt from 'bcrypt';

const prisma = new PrismaClient();

async function main() {
  console.log('🌱 Starting database seeding...');

  // Create roles
  console.log('Creating roles...');
  const roles = await Promise.all([
    prisma.role.upsert({
      where: { name: 'SUPER_ADMIN' },
      update: {},
      create: {
        name: 'SUPER_ADMIN',
        description: 'Super administrator with full system access',
        isSystem: true,
      },
    }),
    prisma.role.upsert({
      where: { name: 'INSTITUTE_ADMIN' },
      update: {},
      create: {
        name: 'INSTITUTE_ADMIN',
        description: 'Institute administrator',
        isSystem: true,
      },
    }),
    prisma.role.upsert({
      where: { name: 'TEACHER' },
      update: {},
      create: {
        name: 'TEACHER',
        description: 'Teacher role',
        isSystem: true,
      },
    }),
    prisma.role.upsert({
      where: { name: 'STUDENT' },
      update: {},
      create: {
        name: 'STUDENT',
        description: 'Student role',
        isSystem: true,
      },
    }),
    prisma.role.upsert({
      where: { name: 'PARENT' },
      update: {},
      create: {
        name: 'PARENT',
        description: 'Parent role',
        isSystem: true,
      },
    }),
  ]);
  console.log(`✅ Created ${roles.length} roles`);

  // Create sample institute
  console.log('Creating sample institute...');
  const institute = await prisma.institute.upsert({
    where: { slug: 'future-academy' },
    update: {},
    create: {
      name: 'Future Academy',
      slug: 'future-academy',
      subdomain: 'futureacademy',
      email: 'info@futureacademy.lk',
      phone: '+94771234567',
      address: '123 Main Street',
      city: 'Colombo',
      province: 'Western',
      country: 'Sri Lanka',
      primaryColor: '#3B82F6',
      secondaryColor: '#10B981',
      status: 'ACTIVE',
    },
  });
  console.log('✅ Created institute: Future Academy');

  // Create super admin
  console.log('Creating super admin...');
  const hashedPassword = await bcrypt.hash('Admin@123', 12);

  let superAdmin = await prisma.user.findFirst({
    where: { email: 'admin@example.com', instituteId: null }
  });

  if (!superAdmin) {
    superAdmin = await prisma.user.create({
      data: {
        email: 'admin@example.com',
        password: hashedPassword,
        firstName: 'Super',
        lastName: 'Admin',
        status: 'ACTIVE',
        emailVerified: true,
      },
    });
  }

  await prisma.userRole.create({
    data: {
      userId: superAdmin.id,
      roleId: roles[0].id,
    },
  }).catch(() => { });
  console.log('✅ Created super admin (admin@example.com / Admin@123)');

  // Create institute admin
  console.log('Creating institute admin...');
  const instituteAdmin = await prisma.user.upsert({
    where: {
      email_instituteId: {
        email: 'institute@futureacademy.lk',
        instituteId: institute.id,
      },
    },
    update: {},
    create: {
      email: 'institute@futureacademy.lk',
      password: hashedPassword,
      firstName: 'Institute',
      lastName: 'Admin',
      instituteId: institute.id,
      status: 'ACTIVE',
      emailVerified: true,
    },
  });

  await prisma.userRole.create({
    data: {
      userId: instituteAdmin.id,
      roleId: roles[1].id,
    },
  }).catch(() => { });
  console.log('✅ Created institute admin (institute@futureacademy.lk / Admin@123)');

  // Create sample subjects
  console.log('Creating subjects...');
  const subjects = await Promise.all([
    prisma.subject.upsert({
      where: { code_instituteId: { code: 'MATH', instituteId: institute.id } },
      update: {},
      create: {
        name: 'Mathematics',
        code: 'MATH',
        description: 'Advanced Mathematics',
        instituteId: institute.id,
      },
    }),
    prisma.subject.upsert({
      where: { code_instituteId: { code: 'SCI', instituteId: institute.id } },
      update: {},
      create: {
        name: 'Science',
        code: 'SCI',
        description: 'General Science',
        instituteId: institute.id,
      },
    }),
    prisma.subject.upsert({
      where: { code_instituteId: { code: 'ENG', instituteId: institute.id } },
      update: {},
      create: {
        name: 'English',
        code: 'ENG',
        description: 'English Language',
        instituteId: institute.id,
      },
    }),
  ]);
  console.log(`✅ Created ${subjects.length} subjects`);

  // Create sample teacher
  console.log('Creating sample teacher...');
  const teacherUser = await prisma.user.upsert({
    where: {
      email_instituteId: {
        email: 'teacher@futureacademy.lk',
        instituteId: institute.id,
      },
    },
    update: {},
    create: {
      email: 'teacher@futureacademy.lk',
      password: hashedPassword,
      firstName: 'John',
      lastName: 'Teacher',
      instituteId: institute.id,
      status: 'ACTIVE',
      emailVerified: true,
    },
  });

  await prisma.userRole.create({
    data: {
      userId: teacherUser.id,
      roleId: roles[2].id,
    },
  }).catch(() => { });

  await prisma.teacher.upsert({
    where: { userId: teacherUser.id },
    update: {},
    create: {
      userId: teacherUser.id,
      instituteId: institute.id,
      teacherId: 'T001',
      qualifications: 'MSc in Mathematics',
      experience: 5,
      bio: 'Experienced mathematics teacher',
      status: 'ACTIVE',
    },
  });
  console.log('✅ Created teacher (teacher@futureacademy.lk / Admin@123)');

  // Create sample student
  console.log('Creating sample student...');
  const studentUser = await prisma.user.upsert({
    where: {
      email_instituteId: {
        email: 'student@futureacademy.lk',
        instituteId: institute.id,
      },
    },
    update: {},
    create: {
      email: 'student@futureacademy.lk',
      password: hashedPassword,
      firstName: 'Jane',
      lastName: 'Student',
      instituteId: institute.id,
      status: 'ACTIVE',
      emailVerified: true,
    },
  });

  await prisma.userRole.create({
    data: {
      userId: studentUser.id,
      roleId: roles[3].id,
    },
  }).catch(() => { });

  await prisma.student.upsert({
    where: { userId: studentUser.id },
    update: {},
    create: {
      userId: studentUser.id,
      instituteId: institute.id,
      studentId: 'S001',
      grade: 'GRADE_10',
      guardianName: 'Parent Name',
      guardianPhone: '+94771234567',
      status: 'ACTIVE',
    },
  });
  console.log('✅ Created student (student@futureacademy.lk / Admin@123)');

  console.log('\n🎉 Database seeding completed successfully!');
  console.log('\n📝 Test Credentials:');
  console.log('┌─────────────────────┬──────────────────────────────┬─────────────┐');
  console.log('│ Role                │ Email                        │ Password    │');
  console.log('├─────────────────────┼──────────────────────────────┼─────────────┤');
  console.log('│ Super Admin         │ admin@example.com            │ Admin@123   │');
  console.log('│ Institute Admin     │ institute@futureacademy.lk   │ Admin@123   │');
  console.log('│ Teacher             │ teacher@futureacademy.lk     │ Admin@123   │');
  console.log('│ Student             │ student@futureacademy.lk     │ Admin@123   │');
  console.log('└─────────────────────┴──────────────────────────────┴─────────────┘');
}

main()
  .catch((e) => {
    console.error('❌ Error seeding database:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
