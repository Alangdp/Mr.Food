import express from 'express';
import {
  store,
  login,
  update,
  indexAll,
  indexById,
} from '../controller/company.controller.js';
import { CompanyLoginMiddleware } from '../middleware/company.middleware.js';

const router = express.Router();

router.get('/index', indexAll);
router.get('/', CompanyLoginMiddleware, indexById);
router.post('/', store);
router.put('/', CompanyLoginMiddleware, update);
router.post('/login', login);

export default router;
