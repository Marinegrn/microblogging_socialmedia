import { Response } from 'express';
import { PrismaClient } from '@prisma/client';
import { z } from 'zod';
import { AuthRequest } from '../middleware/auth';

const prisma = new PrismaClient();

const createPostSchema = z.object({
  content: z.string()
    .min(1, 'Le contenu ne peut pas être vide')
    .max(280, 'Le post ne peut pas dépasser 280 caractères')
});

const paginationSchema = z.object({
  page: z.string().transform(val => {
    const num = parseInt(val);
    return Number.isNaN(num) ? 1 : Math.max(num, 1);
  }),
  limit: z.string().transform(val => {
    const num = parseInt(val);
    return Number.isNaN(num) ? 10 : Math.min(Math.max(num, 1), 50);
  })
});

export const createPost = async (req: AuthRequest, res: Response) => {
  try {
    if (!req.user) return res.status(401).json({ error: 'Authentification requise' });

    const { content } = createPostSchema.parse(req.body);

    const post = await prisma.post.create({
      data: {
        content,
        authorId: req.user.id
      },
      include: {
        author: {
          select: { id: true, username: true, name: true, avatar: true }
        },
        _count: { select: { likes: true } }
      }
    });

    res.status(201).json({
      message: 'Post créé avec succès',
      post: {
        ...post,
        likesCount: post._count.likes,
        isLiked: false
      }
    });

  } catch (error) {
    console.error('Create post error:', error);
    if (error instanceof z.ZodError) {
      return res.status(400).json({ error: error.issues.map(e => e.message).join(', ') });
    }
    res.status(500).json({ error: 'Erreur lors de la création du post' });
  }
};

export const getPosts = async (req: AuthRequest, res: Response) => {
  try {
    const { page, limit } = paginationSchema.parse(req.query);
    const skip = (page - 1) * limit;

    const [posts, totalPosts] = await Promise.all([
      prisma.post.findMany({
        skip,
        take: limit,
        orderBy: { createdAt: 'desc' },
        include: {
          author: { select: { id: true, username: true, name: true, avatar: true } },
          _count: { select: { likes: true } },
          likes: req.user ? {
            where: { userId: req.user.id },
            select: { id: true }
          } : undefined
        }
      }),
      prisma.post.count()
    ]);

    const formattedPosts = posts.map(post => ({
      id: post.id,
      content: post.content,
      createdAt: post.createdAt,
      updatedAt: post.updatedAt,
      author: post.author,
      likesCount: post._count.likes,
      isLiked: req.user ? ((post.likes as unknown as any[])?.length > 0) : false
    }));

    const totalPages = Math.ceil(totalPosts / limit);

    res.json({
      posts: formattedPosts,
      pagination: {
        currentPage: page,
        totalPages,
        totalPosts,
        hasNextPage: page < totalPages,
        hasPrevPage: page > 1,
        nextPage: page < totalPages ? page + 1 : null,
        prevPage: page > 1 ? page - 1 : null
      }
    });

  } catch (error) {
    console.error('Get posts error:', error);
    if (error instanceof z.ZodError) {
      return res.status(400).json({ error: error.issues.map(e => e.message).join(', ') });
    }
    res.status(500).json({ error: 'Erreur lors de la récupération des posts' });
  }
};

export const getPostById = async (req: AuthRequest, res: Response) => {
  try {
    const { id } = req.params;

    const post = await prisma.post.findUnique({
      where: { id },
      include: {
        author: { select: { id: true, username: true, name: true, avatar: true } },
        _count: { select: { likes: true } },
        likes: req.user ? {
          where: { userId: req.user.id },
          select: { id: true }
        } : undefined
      }
    });

    if (!post) return res.status(404).json({ error: 'Post non trouvé' });

    const formattedPost = {
      id: post.id,
      content: post.content,
      createdAt: post.createdAt,
      updatedAt: post.updatedAt,
      author: post.author,
      likesCount: post._count.likes,
      isLiked: req.user ? ((post.likes as unknown as any[])?.length > 0) : false
    };

    res.json({ post: formattedPost });

  } catch (error) {
    console.error('Get post by ID error:', error);
    res.status(500).json({ error: 'Erreur lors de la récupération du post' });
  }
};

export const deletePost = async (req: AuthRequest, res: Response) => {
  try {
    if (!req.user) return res.status(401).json({ error: 'Authentification requise' });

    const { id } = req.params;

    const post = await prisma.post.findUnique({
      where: { id },
      select: { id: true, authorId: true }
    });

    if (!post) return res.status(404).json({ error: 'Post non trouvé' });
    if (post.authorId !== req.user.id) {
      return res.status(403).json({ error: 'Vous ne pouvez supprimer que vos propres posts' });
    }

    await prisma.post.delete({ where: { id } });
    res.json({ message: 'Post supprimé avec succès' });

  } catch (error) {
    console.error('Delete post error:', error);
    res.status(500).json({ error: 'Erreur lors de la suppression du post' });
  }
};

export const getUserPosts = async (req: AuthRequest, res: Response) => {
  try {
    const { userId } = req.params;
    const { page, limit } = paginationSchema.parse(req.query);
    const skip = (page - 1) * limit;

    const user = await prisma.user.findUnique({
      where: { id: userId },
      select: { id: true, username: true }
    });

    if (!user) return res.status(404).json({ error: 'Utilisateur non trouvé' });

    const [posts, totalPosts] = await Promise.all([
      prisma.post.findMany({
        where: { authorId: userId },
        skip,
        take: limit,
        orderBy: { createdAt: 'desc' },
        include: {
          author: { select: { id: true, username: true, name: true, avatar: true } },
          _count: { select: { likes: true } },
          likes: req.user ? {
            where: { userId: req.user.id },
            select: { id: true }
          } : undefined
        }
      }),
      prisma.post.count({ where: { authorId: userId } })
    ]);

    const formattedPosts = posts.map(post => ({
      id: post.id,
      content: post.content,
      createdAt: post.createdAt,
      updatedAt: post.updatedAt,
      author: post.author,
      likesCount: post._count.likes,
      isLiked: req.user ? ((post.likes as unknown as any[])?.length > 0) : false
    }));

    const totalPages = Math.ceil(totalPosts / limit);

    res.json({
      posts: formattedPosts,
      user,
      pagination: {
        currentPage: page,
        totalPages,
        totalPosts,
        hasNextPage: page < totalPages,
        hasPrevPage: page > 1
      }
    });

  } catch (error) {
    console.error('Get user posts error:', error);
    if (error instanceof z.ZodError) {
      return res.status(400).json({ error: error.issues.map(e => e.message).join(', ') });
    }
    res.status(500).json({ error: 'Erreur lors de la récupération des posts utilisateur' });
  }
};

