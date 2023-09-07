import { Router } from 'express';
import authController from '../controllers/auth.controller';

const router = Router();

router.post('/login', authController.login);
router.post('/signup', authController.signup);

router.patch(
  '/updateMyPassword',
  authController.protect,
  authController.updatePassword,
);

export default router;
