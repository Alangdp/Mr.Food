import express from 'express';
import {
  destroy,
  index,
  store,
  update,
  indexActives,
  indexById,
} from '../controller/product.controller.js';
import { CompanyLoginMiddleware } from '../middleware/company.middleware.js';

const router = express.Router();

router.get('/', CompanyLoginMiddleware, index);
router.get('/actives', CompanyLoginMiddleware, indexActives);
router.get('/product/:productId', indexById);
router.post('/', CompanyLoginMiddleware, store);
router.delete('/', CompanyLoginMiddleware, destroy);
router.put('/', CompanyLoginMiddleware, update);

export default router;
