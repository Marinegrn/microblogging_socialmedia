import { beforeAll, afterAll, beforeEach } from 'vitest';
import { PrismaClient } from '@prisma/client';

export const prisma = new PrismaClient({
  datasources: {
    db: {
      url: process.env.TEST_DATABASE_URL || process.env.DATABASE_URL
    }
  }
});

beforeAll(async () => {
  // Connexion à la DB de test
  await prisma.$connect();
});

afterAll(async () => {
  // Nettoyage et déconnexion
  await prisma.$disconnect();
});

beforeEach(async () => {
  // Nettoyage des tables avant chaque test
  await prisma.like.deleteMany();
  await prisma.follow.deleteMany();
  await prisma.post.deleteMany();
  await prisma.user.deleteMany();
});

// Helper pour créer un utilisateur de test
export const createTestUser = async (overrides: any = {}) => {
  return prisma.user.create({
    data: {
      id: `test-user-${Date.now()}-${Math.random()}`,
      email: overrides.email || `test${Date.now()}@example.com`,
      username: overrides.username || `testuser${Date.now()}`,
      name: overrides.name || 'Test User',
      ...overrides
    }
  });
};

// Helper pour créer un post de test
export const createTestPost = async (authorId: string, overrides: any = {}) => {
  return prisma.post.create({
    data: {
      content: overrides.content || 'Test post content',
      authorId,
      ...overrides
    }
  });
};

// Mock Supabase pour les tests
export const mockSupabaseAuth = {
  validUser: {
    id: 'mock-user-id',
    email: 'test@example.com',
    user_metadata: { username: 'testuser' }
  },
  validToken: 'mock-valid-token',
  invalidToken: 'mock-invalid-token'
};