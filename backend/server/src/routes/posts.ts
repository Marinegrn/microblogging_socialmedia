import { Router } from 'express';
import { authMiddleware } from '../middleware/auth';
import {
  createPost,
  getPosts,
  getPostById,
  deletePost,
  getUserPosts
} from '../controllers/postController';

const router = Router();

// Routes publiques : lecture
router.get('/', getPosts); // Timeline générale aka fil d'actu ?
router.get('/:id', getPostById); // Post spécifique
router.get('/user/:userId', getUserPosts); // Posts d'un utilisateur

// Routes protégées : écriture 
router.post('/', authMiddleware, createPost);
router.delete('/:id', authMiddleware, deletePost);

export default router;