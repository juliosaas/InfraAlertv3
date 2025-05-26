import express, { Request, Response } from 'express';
import dotenv from 'dotenv';
import authRoutes from './routes/authRoutes';
import userRoutes from './routes/userRoutes';

dotenv.config(); // Load environment variables from .env file

const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());

// Health check route
app.get('/', (req: Request, res: Response) => {
  res.send('API InfraAlert está rodando!');
});

// API routes
app.use('/api/auth', authRoutes);
app.use('/api/users', userRoutes); // Mount user routes (needs admin protection)

app.listen(port, () => {
  console.log(`Servidor rodando na porta ${port}`);
});

