import { Router } from 'express';
import {
  isAdmin,
  getAllUsers,
  getUserById,
  updateUser,
  deleteUser,
} from '../controllers/userController';

const router = Router();

// Apply isAdmin middleware to all admin routes
// Note: The current isAdmin is a placeholder and needs proper implementation
router.use(isAdmin);

router.get('/', getAllUsers); // Get all users
router.get('/:id', getUserById); // Get user by ID
router.put('/:id', updateUser); // Update user by ID
router.delete('/:id', deleteUser); // Delete user by ID

export default router;

