import express from 'express';
import { ProductController } from './product.controller';

const router = express.Router();

router.post('/create-product', ProductController.createProduct);
router.get('/', ProductController.getAllProduct);

export const ProductRoutes = router;
