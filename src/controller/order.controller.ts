import { RequestHandler } from 'express';
import { errorResponse, response } from '../utils/responses.js';
import { configDotenv } from 'dotenv';
import Product from '../models/Product.js';
import Order from '../models/Order.js';
import { ProductProps } from '../../interfaces/product.interface.js';
import { validRequiredFields } from '../utils/validBody.js';

configDotenv();

const store: RequestHandler = async (req, res) => {
  try {
    const { clientId } = req.body;
    const itens: number[] = req.body.itens;
    // TODO - Add Address
    const openOrder = (await Order.findAll({ where: { clientId } })).filter(
      order => order.status !== 'CANCELED',
    );
    if (openOrder.length)
      return response(res, {
        errors: [{ message: 'You already have an open order' }],
        status: 400,
      });
    const missingFields = validRequiredFields(['clientId', 'itens'], req.body);
    if (missingFields.length)
      return response(res, {
        errors: missingFields.map(field => ({
          message: `${field} is required`,
        })),
        status: 400,
      });
    const products = await Product.findAll({ where: { id: itens } });
    if (products.length !== itens.length)
      return response(res, {
        errors: [{ message: 'Some product was not found' }],
        status: 400,
      });
    products.forEach(product => {
      if (
        product.active === false ||
        product.companyId !== products[0].companyId
      )
        return response(res, {
          errors: [{ message: 'Some product is not available' }],
          status: 400,
        });
    });
    const total = products.reduce(
      (acc, product) =>
        acc +
        Number(product.price) -
        (Number(product.price) * Number(product.discountPercent)) / 100,
      0,
    );
    const order = await Order.create({
      clientId,
      companyId: products[0].companyId,
      itens: products.map(product => {
        const {
          id,
          createdAt,
          companyId,
          updatedAt,
          categoryId,
          ...formatedProduct
        } = product.dataValues;
        return formatedProduct;
      }),
      status: 'PENDING',
      total,
      observation: req.body.observation || '',
    });
    return response(res, { data: order, status: 201 });
  } catch (error) {
    return errorResponse(res, error);
  }
};

export { store };
