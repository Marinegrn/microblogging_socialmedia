import { PrismaClient } from '@prisma/client';

export default async function seedLikes(prisma: PrismaClient) {
  console.log('→ Seeding likes...');

  await prisma.like.createMany({
    data: [
      {
        id: 'like-1',
        userId: 'user-1-id',
        postId: 'post-2-id', // Alice like le post de Bob
      },
      {
        id: 'like-2',
        userId: 'user-2-id',
        postId: 'post-1-id', // Bob like le post d’Alice
      },
    ],
  });

  console.log('✔️ Likes seeded.');
}
