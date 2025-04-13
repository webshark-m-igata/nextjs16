const { PrismaClient } = require('@prisma/client');
const bcrypt = require('bcryptjs');

const prisma = new PrismaClient();

async function main() {
  console.log('Starting seeding...');
  
  // Clear existing users (optional)
  await prisma.user.deleteMany({});
  
  // Create admin user
  const adminPassword = await bcrypt.hash('admin123', 10);
  const admin = await prisma.user.create({
    data: {
      name: 'Admin User',
      email: 'admin@example.com',
      password: adminPassword,
      role: 'admin',
    },
  });
  console.log('Created admin user:', admin.email);
  
  // Create regular user
  const userPassword = await bcrypt.hash('user123', 10);
  const user = await prisma.user.create({
    data: {
      name: 'Regular User',
      email: 'user@example.com',
      password: userPassword,
      role: 'user',
    },
  });
  console.log('Created regular user:', user.email);
  
  console.log('Seeding completed.');
}

main()
  .catch((e) => {
    console.error('Error during seeding:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
