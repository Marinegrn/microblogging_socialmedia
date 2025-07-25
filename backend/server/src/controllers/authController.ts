import { Request, Response } from 'express';
import { PrismaClient } from '@prisma/client';
import supabase from '../config/supabaseClient';
import { z, ZodError } from 'zod';

const prisma = new PrismaClient();

// Schémas de validation
const registerSchema = z.object({
  email: z.string().email('Email invalide'),
  password: z.string().min(6, 'Le mot de passe doit contenir au moins 6 caractères'),
  username: z.string().min(3, 'Le nom d\'utilisateur doit contenir au moins 3 caractères').max(20, 'Maximum 20 caractères')
});

const loginSchema = z.object({
  email: z.string().email('Email invalide'),
  password: z.string().min(1, 'Mot de passe requis')
});

// ▶️ Register
export const register = async (req: Request, res: Response) => {
  try {
    const { email, password, username } = registerSchema.parse(req.body);

    const existingUser = await prisma.user.findUnique({ where: { username } });

    if (existingUser) {
      return res.status(400).json({ error: 'Ce nom d\'utilisateur est déjà pris' });
    }

    const { data: authData, error: authError } = await supabase.auth.admin.createUser({
      email,
      password,
      user_metadata: { username }
    });

    if (authError || !authData?.user) {
      return res.status(400).json({ error: authError?.message || 'Erreur lors de la création du compte' });
    }

    const user = await prisma.user.create({
      data: {
        id: authData.user.id,
        email,
        username,
        name: username
      }
    });

    res.status(201).json({
      message: 'Compte créé avec succès',
      user: {
        id: user.id,
        email: user.email,
        username: user.username
      }
    });

  } catch (error) {
    console.error('Register error:', error);
    if (error instanceof ZodError) {
      return res.status(400).json({
        error: error.issues.map(issue => issue.message).join(', ')
      });
    }
    return res.status(500).json({ error: 'Erreur serveur lors de l\'inscription' });
  }
};

// ▶️ Login
export const login = async (req: Request, res: Response) => {
  try {
    const { email, password } = loginSchema.parse(req.body);

    const { data, error } = await supabase.auth.signInWithPassword({ email, password });

    if (error || !data?.user || !data?.session) {
      return res.status(401).json({ error: 'Email ou mot de passe incorrect' });
    }

    const user = await prisma.user.findUnique({
      where: { id: data.user.id },
      select: {
        id: true,
        email: true,
        username: true,
        name: true,
        bio: true,
        avatar: true
      }
    });

    res.json({
      message: 'Connexion réussie',
      user,
      session: {
        access_token: data.session.access_token,
        refresh_token: data.session.refresh_token
      }
    });

  } catch (error) {
    console.error('Login error:', error);
    if (error instanceof ZodError) {
      return res.status(400).json({ error: error.issues[0]?.message });
    }
    return res.status(500).json({ error: 'Erreur serveur lors de la connexion' });
  }
};

// ▶️ Logout
export const logout = async (req: Request, res: Response) => {
  try {
    const authHeader = req.headers.authorization;
    const token = authHeader?.startsWith('Bearer ') ? authHeader.slice(7) : null;

    if (token) {
      await supabase.auth.admin.signOut(token);
    }

    res.json({ message: 'Déconnexion réussie' });
  } catch (error) {
    console.error('Logout error:', error);
    res.status(500).json({ error: 'Erreur lors de la déconnexion' });
  }
};

// ▶️ Me
export const me = async (req: Request, res: Response) => {
  try {
    const authHeader = req.headers.authorization;
    const token = authHeader?.startsWith('Bearer ') ? authHeader.slice(7) : null;

    if (!token) {
      return res.status(401).json({ error: 'Token requis' });
    }

    const { data: { user }, error } = await supabase.auth.getUser(token);

    if (error || !user) {
      return res.status(401).json({ error: 'Token invalide' });
    }

    const userData = await prisma.user.findUnique({
      where: { id: user.id },
      select: {
        id: true,
        email: true,
        username: true,
        name: true,
        bio: true,
        avatar: true,
        createdAt: true,
        _count: {
          select: {
            posts: true,
            followers: true,
            following: true
          }
        }
      }
    });

    if (!userData) {
      return res.status(404).json({ error: 'Utilisateur non trouvé' });
    }

    res.json({ user: userData });

  } catch (error) {
    console.error('Me endpoint error:', error);
    res.status(500).json({ error: 'Erreur serveur' });
  }
};

