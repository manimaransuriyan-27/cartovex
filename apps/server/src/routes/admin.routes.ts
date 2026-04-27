import { Router } from 'express';
import { blockUser, deleteUser, getAllUsers, getUserById } from '../controllers';
import { isAdmin } from '../middlewares/admin.middleware';
import { authprotect } from '../middlewares/auth.middleware';

const router = Router();

router.use(authprotect, isAdmin);

router.get('/users', getAllUsers);
router.get('/users/:id', getUserById);
router.patch('/users/:id/block', blockUser);
router.delete('/users/:id', deleteUser);

export default router;
