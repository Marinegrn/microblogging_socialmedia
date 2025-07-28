import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/prisma';

export async function GET() {
  try {
    const posts = await prisma.post.findMany({
      orderBy: { createdAt: 'desc' },
      include: {
        author: {
          select: { id: true, username: true, name: true, avatar: true },
        },
        _count: {
          select: { likes: true },
        },
      },
    });

    return NextResponse.json(posts);
  } catch (error) {
    console.error('Erreur GET posts:', error);
    return NextResponse.json({ error: 'Erreur serveur' }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { content, authorId } = body;

    if (!content || typeof content !== 'string' || content.length === 0) {
      return NextResponse.json({ error: 'Contenu invalide' }, { status: 400 });
    }
    if (!authorId || typeof authorId !== 'string') {
      return NextResponse.json({ error: 'authorId invalide' }, { status: 400 });
    }

    const post = await prisma.post.create({
      data: {
        content,
        authorId,
      },
      include: {
        author: {
          select: { id: true, username: true, name: true, avatar: true },
        },
        _count: {
          select: { likes: true },
        },
      },
    });

    return NextResponse.json(post, { status: 201 });
  } catch (error) {
    console.error('Erreur POST post:', error);
    return NextResponse.json({ error: 'Erreur serveur' }, { status: 500 });
  }
}

