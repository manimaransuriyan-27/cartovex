import { Router } from 'express';
import authRoutes from '@/modules/auth/auth.routes';

const router = Router();

router.use('/auth', authRoutes);

export default router;

// router.use("/users", userRoutes);
// router.use("/products", productRoutes);
// router.use("/orders", orderRoutes);
// router.use("/addresses", addressRoutes);
// router.use("/admin", adminRoutes);
