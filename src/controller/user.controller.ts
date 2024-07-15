import { RequestHandler } from 'express';
import { addError, errorResponse, response } from '../utils/responses.js';
import { User } from '../models/User.js';

const index: RequestHandler = async (req, res) => {
  try {
    const users = await User.findAll();
    return response(res, { data: users, status: 200 });
  } catch (error) {
    return errorResponse(res, error);
  }
};

const store: RequestHandler = async (req, res) => {
  try {
    const user = await User.create(req.body);
    return response(res, { data: user, status: 201 });
  } catch (error) {
    return errorResponse(res, error);
  }
};

const update: RequestHandler = async (req, res) => {
  try {
    const user = await User.findByPk(req.params.id);
    if (!user) return response(res, { data: {}, status: 404 });
    user.update(req.body);
    return response(res, { data: user, status: 200 });
  } catch (error) {
    return errorResponse(res, error);
  }
};

const destroy: RequestHandler = async (req, res) => {
  try {
    const user = await User.findByPk(req.params.id);
    if (!user) return response(res, { data: {}, status: 404 });
    user.destroy();
    return response(res, { data: {}, status: 204 });
  } catch (error) {
    return errorResponse(res, error);
  }
};

const login: RequestHandler = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ where: { email } });
    if (!user)
      return response(res, {
        errors: [addError('Invalid Email or password', {})],
        status: 404,
      });
    if (!(await user.validatePassword(password)))
      throw new Error('Invalid Email or password');
    return response(res, { data: user, status: 200 });
  } catch (error) {
    return errorResponse(res, error);
  }
};

export { index, store, update, destroy, login };
