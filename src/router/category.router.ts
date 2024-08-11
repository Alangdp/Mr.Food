import express from 'express';
import { CompanyLoginMiddleware } from '../middleware/company.middleware.js';
import {
  store,
  deleteCategory,
  index,
  changeActive,
} from '../controller/category.controller.js';

const router = express.Router();

router.post('/', CompanyLoginMiddleware, store);
router.get('/', CompanyLoginMiddleware, index);
router.delete('/', CompanyLoginMiddleware, deleteCategory);
router.put('/category/:categoryId', CompanyLoginMiddleware, changeActive);

export default router;
