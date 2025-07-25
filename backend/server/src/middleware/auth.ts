import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import  supabase  from '../config/supabaseClient';
import { PrismaClient } from '@prisma/client';

export const prisma = new PrismaClient();
export interface AuthRequest extends Request {
  user?: {
    id: string;
    email: string;
    username?: string;
  };
}

export const authMiddleware = async (
  req: AuthRequest,
  res: Response,
  next: NextFunction
) => {
  try {
    const authHeader = req.headers.authorization;
    
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return res.status(401).json({ error: 'Token d\'authentification requis' });
    }

    const token = authHeader.substring(7);
    
    // Vérifier le token avec Supabase
    const { data: { user }, error } = await supabase.auth.getUser(token);
    
    if (error || !user) {
      return res.status(401).json({ error: 'Token invalide' });
    }

    req.user = {
      id: user.id,
      email: user.email!,
      username: user.user_metadata?.username
    };

    next();
  } catch (error) {
    console.error('Auth middleware error:', error);
    res.status(401).json({ error: 'Erreur d\'authentification' });
  }
};
