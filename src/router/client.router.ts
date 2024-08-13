import express from 'express';
import {
  login,
  store,
  update,
  index,
} from '../controller/client.controller.js';
import { ClientLoginMiddleware } from '../middleware/client.middlewarte.js';

const router = express.Router();

router.post('/', store);
router.get('/', ClientLoginMiddleware, index);
router.post('/login', login);
router.put('/:phone', update);

export default router;
