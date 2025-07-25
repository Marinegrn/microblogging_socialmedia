import { PrismaClient } from '@prisma/client';

export default async function seedPosts(prisma: PrismaClient) {
  console.log('→ Seeding posts...');

  await prisma.post.createMany({
    data: [
      {
        id: 'post-1-id',
        content: 'Première mission Freelance 🎉',
        authorId: 'user-1-id',
      },
      {
        id: 'post-2-id',
        content: 'Hello mes Followers ! 👋',
        authorId: 'user-2-id',
      },
    ],
  });

  console.log('✔️ Posts seeded.');
}
