import { Router } from 'express';
import { authController } from './auth.controller';
import { authenticate } from '@/middleware/auth.middleware';
// import other controllers as you migrate them to this structure
// import { logoutController } from './logout.controller';
// import { refreshController } from './refresh.controller';
// import { forgotPasswordController, resetPasswordController } from './password.controller';
// import { registerUserController, registerAdminController } from './auth.controller';

const router = Router();

// Public routes
router.post('/register', authController.register);
router.post('/register-admin', authController.registerAdmin);
router.post('/login', authController.login);
router.post('/refresh', authController.refresh);
// router.post('/forgot-password', forgotPasswordController);
// router.put('/reset-password/:token', resetPasswordController);

// Protected routes
router.get('/me', authenticate, authController.getMe);
// router.post('/logout', authenticate, logoutController);

export default router;
