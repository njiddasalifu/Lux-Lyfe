import { Router } from 'express';
import authController from '../controllers/auth.controller.js';
import categoryController from '../controllers/category.controller.js';
import productRouter from './product.routes.js';
import UserRole from '../utilities/enums/e.user-role.js';

const router = Router();

router.use('/:categoryId/products', productRouter);

router
  .route('/')
  .post(
    authController.protect,
    authController.restrictTo(UserRole.ADMIN),
    categoryController.uploadIcon,
    categoryController.formatUploadIcon,
    categoryController.createCategory
  )
  .get(categoryController.getAllCategories);

router
  .route('/:id')
  .get(categoryController.getCategory)
  .patch(
    authController.protect,
    authController.restrictTo(UserRole.ADMIN),
    categoryController.updateCategory
  )
  .delete(
    authController.protect,
    authController.restrictTo(UserRole.ADMIN),
    categoryController.deleteCategory
  );

export default router;
