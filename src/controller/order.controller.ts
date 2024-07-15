import { RequestHandler } from 'express';
import { errorResponse, response } from '../utils/responses.js';
import { configDotenv } from 'dotenv';
import Product from '../models/Product.js';
import Order from '../models/Order.js';
import { validRequiredFields } from '../utils/validBody.js';
import { randomUUID } from 'crypto';

configDotenv();

const index: RequestHandler = async (req, res) => {
  try {
    const { id } = req.body;
    const orders = await Order.findAll({ where: { companyId: id } });
    return response(res, { status: 200, data: orders });
  } catch (error) {
    return errorResponse(res, error);
  }
};

const store: RequestHandler = async (req, res) => {
  try {
    const { clientId } = req.body;
    if (!Array.isArray(req.body.items))
      throw new Error('Items it must be number Array');
    const items: number[] = req.body.items;
    // TODO - Add Address
    const openOrder = (await Order.findAll({ where: { clientId } })).filter(
      order => order.status !== 'CANCELED' && order.status !== 'DELIVERED',
    );
    if (openOrder.length)
      return response(res, {
        errors: [{ message: 'You already have an open order' }],
        status: 400,
      });
    const missingFields = validRequiredFields(['clientId', 'items'], req.body);
    if (missingFields.length)
      return response(res, {
        errors: missingFields.map(field => ({
          message: `${field} is required`,
        })),
        status: 400,
      });
    const products = await Product.findAll({ where: { id: items } });
    if (items.length === 0 || products.length !== items.length)
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
        (Number(product.price) -
          (Number(product.price) * Number(product.discountPercent)) / 100) *
          (product.quantity || 1),
      0,
    );
    console.log(products[0].companyId);
    const order = await Order.create({
      id: randomUUID(),
      clientId,
      companyId: 1,
      items: products.map(product => {
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
    console.log(error);
    return errorResponse(res, error);
  }
};

const changeStatus: RequestHandler = async (req, res) => {
  const permitedStatus = {
    1: 'PENDING',
    2: 'PREPARING',
    3: 'READY',
    4: 'DELIVERED',
    5: 'CANCELED',
  };

  try {
    const { orderId, status, id: companyId } = req.body;
    const missingFields = validRequiredFields(['orderId', 'status'], req.body);
    if (missingFields.length)
      return response(res, {
        errors: missingFields.map(field => ({
          message: `${field} is required`,
        })),
        status: 400,
      });
    if (
      typeof status !== 'number' ||
      !permitedStatus[status as keyof typeof permitedStatus]
    ) {
      return response(res, {
        errors: [{ message: 'Invalid status Code' }],
        status: 400,
      });
    }
    const order = await Order.findByPk(orderId);
    if (!order) {
      return response(res, {
        errors: [{ message: 'Order not found' }],
        status: 404,
      });
    }
    if (order.status === 'CANCELED') {
      return response(res, {
        errors: [{ message: 'Order already canceled' }],
        status: 400,
      });
    }
    if (order.companyId !== companyId) {
      return response(res, {
        errors: [
          { message: 'You are not allowed to change this order status' },
        ],
        status: 403,
      });
    }
    order.update({
      status: permitedStatus[status as keyof typeof permitedStatus],
    });
    await order.save();
    return response(res, { data: order, status: 200 });
  } catch (error) {
    return errorResponse(res, error);
  }
};

export { store, changeStatus, index };
