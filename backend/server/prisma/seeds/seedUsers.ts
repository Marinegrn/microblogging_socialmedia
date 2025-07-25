import { PrismaClient } from '@prisma/client';
import { v4 as uuidv4 } from 'uuid';

export default async function seedUsers(prisma: PrismaClient) {
  console.log('→ Seeding users...');

  await prisma.user.createMany({
    data: [
      {
        id: uuidv4(),
        email: 'alice@example.com',
        username: 'alice',
        name: 'Alice',
        bio: 'Développeuse web passionnée.',
        avatar: 'https://i.pravatar.cc/150?img=1',
      },
      {
        id: uuidv4(),
        email: 'bob@example.com',
        username: 'bob',
        name: 'Bob',
        bio: 'Designer UI/UX.',
        avatar: 'https://i.pravatar.cc/150?img=2',
      },
    ],
  });

  console.log('✔️ Users seeded.');
}

