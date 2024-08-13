import { RequestHandler } from 'express';
import { errorResponse, response } from '../utils/responses.js';
import Client from '../models/Client.js';
import { createToken } from '../utils/token.js';
import { configDotenv } from 'dotenv';

configDotenv();

const index: RequestHandler = async (req, res) => {
  try {
    const clientId = req.body.clientId;
    const client = await Client.findByPk(clientId);
    return response(res, { data: client, status: 200 });
  } catch (error) {
    return errorResponse(res, error);
  }
};

const store: RequestHandler = async (req, res) => {
  try {
    const requiredFields = ['phoneNumber', 'name', 'password'];
    const missingFields = requiredFields.filter(field => !req.body[field]);
    if (missingFields.length > 0) {
      return response(res, {
        errors: missingFields.map(field => ({
          message: `${field} is required`,
        })),
        status: 400,
      });
    }
    const clientDB = await Client.findByPhone(req.body.phoneNumber);
    if (clientDB) throw new Error('Phone already registered');
    const client = await Client.create({
      name: req.body.name,
      password: req.body.password,
      phoneNumber: req.body.phoneNumber,
    });
    return response(res, { data: client, status: 201 });
  } catch (error) {
    console.log(error);
    return errorResponse(res, error);
  }
};

const update: RequestHandler = async (req, res) => {
  try {
    const { phone } = req.params;
    const { name } = req.body;
    const client = await Client.findByPhone(phone);
    if (!client)
      return response(res, {
        errors: [{ message: 'Client not found' }],
        status: 404,
      });
    (await client.update({ name })).save();

    return response(res, { data: client, status: 200 });
  } catch (error) {
    return errorResponse(res, error);
  }
};

const login: RequestHandler = async (req, res) => {
  try {
    const { phoneNumber: phone } = req.body;
    if (!phone) {
      throw new Error('Phone is required');
    }
    const client = await Client.findByPhone(phone);
    if (!client)
      return response(res, {
        errors: [{ message: 'Invalid Phone' }],
        status: 404,
      });
    if (!(await client.login(req.body.password)))
      return response(res, {
        errors: [{ message: 'Invalid Password' }],
        status: 400,
      });
    const token = createToken(
      client.dataValues.id,
      process.env.SECRET_CLIENT as string,
    );
    return response(res, { data: token, status: 200 });
  } catch (error) {
    return errorResponse(res, error);
  }
};

export { store, login, update, index };
