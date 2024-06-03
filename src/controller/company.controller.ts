import { RequestHandler } from "express";
import { errorResponse, response } from "../utils/responses.js";
import Company from "../models/Company.js";
import { createToken } from "../middleware/company.middleware.js";

const store: RequestHandler = async (req, res) => {
  try {
    const requiredFields = [
      'name',
      'cnpj',
      'email',
      'phone',
      'orderMinimum',
      'paymentMethods',
      'address',
      'deliveryOptions',
      'password'
    ];
    const missingFields = requiredFields.filter((field) => !req.body[field]);
    if (missingFields.length) {
      return response(res, {errors: missingFields.map((field) => ({message: `${field} is required`})), status: 400});
    }
    const company = await Company.create(req.body);
    return response(res, {data: company, status: 201});
  } catch (error) {
    return errorResponse(res, error);
  }
};

const login: RequestHandler = async (req, res) => {
  try {
    const requiredFields = [
      'email',
      'password'
    ];
    const missingFields = requiredFields.filter((field) => !req.body[field]);
    if (missingFields.length) {
      return response(res, {errors: missingFields.map((field) => ({message: `${field} is required`})), status: 400});
    }
    const { email, password } = req.body;
    const company = await Company.findOne({ where: { email } });
    if (!company) return response(res, {errors: [{message: "Invalid Email or Password"}], status: 404});
    if(!company.validatePassword(password)) return response(res, {errors: [{message: "Invalid Email or Password"}], status: 404});

    const token = createToken(company.dataValues.id);
    return response(res, {data: token, status: 200});
  } catch (error) {
    return errorResponse(res, error);
  }
};

const update: RequestHandler = async (req, res) => {
  try {
    const { id } = req.body;
    console.log(req.body);
    const company = await Company.findByPk(id);
    if (!company) return response(res, {errors: [{message: "Company not found"}], status: 404});
    (await company.update(req.body)).save();

    return response(res, {data: company, status: 200});
  } catch (error) {
    return errorResponse(res, error);
  }
};

export { store, login, update };
