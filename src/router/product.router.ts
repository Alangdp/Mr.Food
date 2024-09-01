import express from 'express';
import {
  destroy,
  index,
  update,
  indexActives,
  indexById,
  changeActive,
  indexAllWithCompany,
  storePhoto,
  indexAll,
} from '../controller/product.controller.js';
import { CompanyLoginMiddleware } from '../middleware/company.middleware.js';
import multer from 'multer';

const router = express.Router();

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, './public/images');
  },
  filename: (req, file, cb) => {
    cb(null, new Date().getTime() + file.originalname);
  },
});

const upload = multer({ storage });

router.get('/index', indexAll);
router.get('/', CompanyLoginMiddleware, index);
router.get('/actives', CompanyLoginMiddleware, indexActives);
router.get('/product/:productId', CompanyLoginMiddleware, indexById);
router.post('/product/', indexAllWithCompany);
router.put('/product/:productId', CompanyLoginMiddleware, changeActive);
router.post('/', upload.array('image[0]'), CompanyLoginMiddleware, storePhoto);
router.delete('/', CompanyLoginMiddleware, destroy);
router.put('/', upload.array('image[0]'), CompanyLoginMiddleware, update);

export default router;
