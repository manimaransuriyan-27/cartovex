import { Router } from 'express';
import {
  registerAdminController,
  registerUserController,
} from '../controllers/auth/register.controller';
import { loginController } from '../controllers/auth/login.controller';
import { forgotPasswordController } from '../controllers/auth/password.controller';
import { resetPasswordController } from '../controllers/auth/resetPassword.controller';

const router = Router();

router.post('/register-admin', registerAdminController);

router.post('/register', registerUserController);

router.post('/login', loginController);

router.post('/forgot-password', forgotPasswordController);

router.put('/reset-password/:token', resetPasswordController);

export default router;
