import { Application } from 'express';
import express from 'express';
import cors from 'cors';

// eslint-disable-next-line @typescript-eslint/no-unused-vars
import database from './database/index.js';

import UserRouter from './router/user.router.js';
import ClientRouter from './router/client.router.js';
import CompanyRouter from './router/company.router.js';
import CategoryRouter from './router/category.router.js';
import ProductRouter from './router/product.router.js';
import OrderRouter from './router/order.router.js';
import AddressRouter from './router/address.router.js';

class App {
  public app: Application;

  constructor() {
    this.app = express();
    this.configure();
    this.middlewares();
    this.routes();
  }

  middlewares() {}

  routes() {
    this.app.use('/users', UserRouter);
    this.app.use('/clients', ClientRouter);
    this.app.use('/companies', CompanyRouter);
    this.app.use('/categories', CategoryRouter);
    this.app.use('/products', ProductRouter);
    this.app.use('/orders', OrderRouter);
    this.app.use('/address', AddressRouter);
  }

  configure() {
    this.app.use(express.json());
    this.app.use(express.urlencoded({ extended: true }));
    this.app.use(cors());

    this.app.use('/public/', express.static('./public'));
  }
}

export default new App().app;
