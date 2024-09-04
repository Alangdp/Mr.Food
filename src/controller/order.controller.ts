/* eslint-disable @typescript-eslint/no-unused-vars */
import { RequestHandler } from 'express';
import { errorResponse, response } from '../utils/responses.js';
import { configDotenv } from 'dotenv';
import Product from '../models/Product.js';
import Order from '../models/Order.js';
import { validRequiredFields } from '../utils/validBody.js';
import { randomUUID } from 'crypto';
import { ItemOption } from '../../types/ExtraOptions.type.js';

configDotenv();

const index: RequestHandler = async (req, res) => {
  try {
    const { id } = req.body;
    const orders = await Order.findAll({ where: { companyId: id } });
    return response(res, {
      status: 200,
      data: orders,
    });
  } catch (error) {
    return errorResponse(res, error);
  }
};

const validateOrder = (items: any): string | ItemOption[] => {
  if (!Array.isArray(items)) return 'Items must be an array';
  for (const item of items) {
    if (!item.productId || typeof item.productId !== 'number')
      return 'ProdcutId must be a number';
    if (!item.quantity || typeof item.quantity !== 'number')
      return 'Quantity must be a number';
    if (!item.extras || typeof item.extras !== 'object')
      return 'Extras must be array';

    for (const extraKey of Object.keys(item.extras)) {
      const extrasOptions = item.extras[extraKey];
      if (typeof extrasOptions !== 'object')
        return 'Extra Option must be a array';
      for (const extraOption of extrasOptions) {
        if (!extraOption.extraName || typeof extraOption.extraName !== 'string')
          return 'Extra name must be a text';
        if (!extraOption.quantity || typeof extraOption.quantity !== 'number')
          return 'Extra quantity must be a number';
        if (!extraOption.price || typeof extraOption.price !== 'number')
          return 'Extra price must be a number';
      }
    }
  }

  return items as ItemOption[];
};

const store: RequestHandler = async (req, res) => {
  try {
    const { clientId } = req.body;

    // Validate required fields
    const missingFields = validRequiredFields(['clientId', 'items'], req.body);
    if (missingFields.length)
      return response(res, {
        errors: missingFields.map(field => ({
          message: `${field} is required`,
        })),
        status: 400,
      });

    // ? Validate if user has active order
    // if (await Order.hasActiveOrder(clientId))
    //   return response(res, {
    //     errors: [{ message: 'You already have an open order' }],
    //     status: 400,
    //   });

    // Validate valid order structure
    const orderItem = validateOrder(req.body.items);
    if (!Array.isArray(orderItem))
      return response(res, {
        errors: [{ message: orderItem }],
        status: 400,
      });

    // Variable about selected products
    const selectedProductsIds = orderItem.map(item => item.productId);
    const products = await Product.findAll({
      where: { id: selectedProductsIds },
    });

    if (
      selectedProductsIds.length === 0 ||
      products.length !== selectedProductsIds.length
    )
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

    type PossibleOptionsStructure = {
      [key: string]: Possibilities;
    };

    type Possibilities = {
      [key: string]: number;
    };

    const allPossibilities: PossibleOptionsStructure = {};
    for (const product of products) {
      for (const extra of product.extras) {
        const possiblities = extra.itens.reduce((acc, val) => {
          acc[val.name.replace(/[^a-zA-Z0-9 ]/g, '').trim()] = val.price;
          return acc;
        }, {} as Possibilities);
        allPossibilities[extra.name.replace(/[^a-zA-Z0-9 ]/g, '').trim()] =
          possiblities;
      }
    }

    let extrasTotal = 0;
    for (const item of orderItem) {
      for (const extraKey of Object.keys(item.extras)) {
        // WSC - WithoutSpecialCharacters
        const keyWSC = extraKey.replace(/[^a-zA-Z0-9 ]/g, '');
        for (const extraKey of Object.keys(item.extras)) {
          if (!Object.keys(allPossibilities).includes(keyWSC))
            throw new Error('Product not contains extra:' + extraKey);

          for (const extraOptions of item.extras[extraKey]) {
            const extraOptionWSC = extraOptions.extraName.replace(
              /[^a-zA-Z0-9 ]/g,
              '',
            );
            if (!Object.keys(allPossibilities[keyWSC]).includes(extraOptionWSC))
              throw new Error(
                'Extra Options: ' +
                  extraKey +
                  ' not contains: ' +
                  extraOptions.extraName,
              );
            extrasTotal +=
              allPossibilities[keyWSC][extraOptionWSC] * extraOptions.quantity;
          }
        }
      }
    }

    for (const [index, item] of orderItem.entries()) {
      const product = products.find(val => val.id === item.productId);
      if (!product) throw new Error('Some product is not available');

      orderItem[index] = {
        ...item,
        productName: product.name,
        productTotalPrice: product.price,
      };
    }

    const subTotal = orderItem.reduce((acc, item) => {
      const product = products.find(product => product.id === item.productId);
      if (!product) return acc;
      return acc + Number(product.price);
    }, 0);

    const order = await Order.create({
      id: randomUUID(),
      clientId,
      companyId: 1,
      items: orderItem,
      status: 'PENDING',
      total: subTotal + extrasTotal,
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
