import { PrismaClient } from '@prisma/client';

export default async function seedFollows(prisma: PrismaClient) {
  console.log('→ Seeding follows...');

  await prisma.follow.createMany({
    data: [
      {
        id: 'follow-1',
        followerId: 'user-1-id',   // Alice suit Bob
        followingId: 'user-2-id',
      },
      {
        id: 'follow-2',
        followerId: 'user-2-id',   // Bob suit Alice
        followingId: 'user-1-id',
      },
    ],
  });

  console.log('✔️ Follows seeded.');
}
