import { Request, Response } from 'express';
import prisma from '../prisma';

// Middleware placeholder for checking admin role (implement actual logic later)
export const isAdmin = (req: Request, res: Response, next: Function) => {
  // TODO: Implement JWT verification and role check
  // For now, allow access for demonstration
  console.warn('Admin check middleware not implemented yet!');
  next();
};

// Get all users (excluding password)
export const getAllUsers = async (req: Request, res: Response) => {
  try {
    const users = await prisma.user.findMany({
      select: { id: true, email: true, name: true, createdAt: true, updatedAt: true },
    });
    res.json(users);
  } catch (error) {
    console.error('Erro ao buscar usuários:', error);
    res.status(500).json({ message: 'Erro interno do servidor ao buscar usuários.' });
  }
};

// Get user by ID (excluding password)
export const getUserById = async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    const user = await prisma.user.findUnique({
      where: { id: parseInt(id, 10) },
      select: { id: true, email: true, name: true, createdAt: true, updatedAt: true },
    });
    if (!user) {
      return res.status(404).json({ message: 'Usuário não encontrado.' });
    }
    res.json(user);
  } catch (error) {
    console.error('Erro ao buscar usuário por ID:', error);
    res.status(500).json({ message: 'Erro interno do servidor ao buscar usuário.' });
  }
};

// Update user (example: update name)
export const updateUser = async (req: Request, res: Response) => {
  const { id } = req.params;
  const { name } = req.body; // Add other fields as needed

  try {
    const updatedUser = await prisma.user.update({
      where: { id: parseInt(id, 10) },
      data: { name }, // Update only specified fields
      select: { id: true, email: true, name: true, createdAt: true, updatedAt: true },
    });
    res.json(updatedUser);
  } catch (error) {
    console.error('Erro ao atualizar usuário:', error);
    // Handle potential errors like user not found (P2025)
    if (error.code === 'P2025') {
        return res.status(404).json({ message: 'Usuário não encontrado para atualização.' });
    }
    res.status(500).json({ message: 'Erro interno do servidor ao atualizar usuário.' });
  }
};

// Delete user
export const deleteUser = async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    await prisma.user.delete({
      where: { id: parseInt(id, 10) },
    });
    res.status(204).send(); // No content on successful deletion
  } catch (error) {
    console.error('Erro ao deletar usuário:', error);
    // Handle potential errors like user not found (P2025)
     if (error.code === 'P2025') {
        return res.status(404).json({ message: 'Usuário não encontrado para exclusão.' });
    }
    res.status(500).json({ message: 'Erro interno do servidor ao deletar usuário.' });
  }
};

