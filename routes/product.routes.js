import { Router } from 'express';

import authController from '../controllers/auth.controller.js';
import productController from '../controllers/product.controller.js';
import eUserRole from '../utilities/enums/e.user-role.js';

const router = Router({ mergeParams: true });

router
  .route('/')
  .post(
    authController.protect,
    authController.restrictTo(eUserRole.GROCER),
    productController.uploadProductImages,
    productController.resizeProductImages,
    productController.setProductStoreId,
    productController.createProduct
  )
  .get(productController.getAllProducts);

router
  .route('/:id')
  .get(productController.getProduct)
  .patch(
    authController.protect,
    authController.restrictTo(eUserRole.ADMIN, eUserRole.GROCER),
    productController.uploadProductImages,
    productController.resizeProductImages,
    productController.updateProduct
  )
  .delete(
    authController.protect,
    authController.restrictTo(eUserRole.ADMIN, eUserRole.GROCER),
    productController.deleteProduct
  );

export default router;
