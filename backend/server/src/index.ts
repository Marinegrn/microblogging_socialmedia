import './config/dotenv'; // doit arriver avant les autres imports
// console.log('DATABASE_URL:', process.env.DATABASE_URL); // revert / TEST -> DOUBLE OK ! 

import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import morgan from 'morgan';
import { PrismaClient } from '@prisma/client';

// WIP -> GROS DEBUG
import authRoutes from './routes/auth';
import postRoutes from './routes/posts';

const app = express();

const port = process.env.PORT || 3001;
const prisma = new PrismaClient();

// Middlewares essentiels
app.use(helmet());
app.use(cors({
  origin: process.env.NODE_ENV === 'production' 
    ? ['https://your-app.vercel.app'] 
    : ['http://localhost:3000'],
  credentials: true
}));
app.use(morgan('dev'));
app.use(express.json());

// Route simple pour test serveur
app.get('/health', (req, res) => {
  res.json({ status: 'OK', time: new Date().toISOString() });
});

// Route test connexion base de données : désactiver en prod ! 
app.get('/db-test', async (req, res) => {
  try {
    await prisma.$connect();
    res.json({ status: 'Database connected successfully' });
  } catch (error) {
    console.error('Database connection error:', error);
    res.status(500).json({ error: 'Database connection failed' });
  }
});

// WIP -> GROS DEBUG
// Routes 
app.use('/api/auth', authRoutes);
app.use('/api/posts', postRoutes);

// Middleware gestion d’erreur simple
app.use((err: Error, req: express.Request, res: express.Response, next: express.NextFunction) => {
  console.error(err.stack);
  res.status(500).json({ error: 'Internal server error' });
});

// 404 - route non trouvée
app.use((req, res) => {
  res.status(404).json({ error: 'Not found' });
});

// Démarrage serveur
app.listen(port, () => {
  console.log(`🚀 Server running on http://localhost:${port}`);
});

// Fermeture propre de Prisma à l’arrêt du serveur
process.on('SIGINT', async () => {
  await prisma.$disconnect();
  process.exit();
});
