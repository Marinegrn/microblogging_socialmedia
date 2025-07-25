import { config } from 'dotenv';
import path from 'path';

config({ path: path.resolve(__dirname, '../.env') });

import { PrismaClient } from '@prisma/client';
import seedUsers from './seeds/seedUsers';
import seedPosts from './seeds/seedPosts';
import seedFollows from './seeds/seedFollows';
import seedLikes from './seeds/seedLikes';

const prisma = new PrismaClient();

async function main() {
  console.log('🌱 Start seeding...');
  await seedUsers(prisma);
  await seedPosts(prisma);
  await seedFollows(prisma);
  await seedLikes(prisma);
  console.log('✅ Seeding completed.');
}

main()
  .catch((e) => {
    console.error('❌ Error during seeding:', e);
    // Remove process.exit(1); to avoid abrupt termination and let finally block run
  })
  .finally(async () => {
    await prisma.$disconnect();
  });

