import express from 'express';
import {
  store,
  changeStatus,
  index,
  getOrderByIdAndClientId,
} from '../controller/order.controller.js';
import { ClientLoginMiddleware } from '../middleware/client.middlewarte.js';
import { CompanyLoginMiddleware } from '../middleware/company.middleware.js';

const router = express.Router();

router.get('/', CompanyLoginMiddleware, index);
router.get('/client/:orderId', ClientLoginMiddleware, getOrderByIdAndClientId);
router.post('/', ClientLoginMiddleware, store);
router.post('/status', CompanyLoginMiddleware, changeStatus);

export default router;
