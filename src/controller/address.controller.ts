import { RequestHandler } from "express";
import { errorResponse, response } from "../utils/responses.js";
import { configDotenv } from "dotenv";
import { validRequiredFields } from "../utils/validBody.js";
import { Address } from "../models/Address.js";

configDotenv();

const store: RequestHandler = async (req, res) => {
  try {
    const missingFields = validRequiredFields(["clientId", "cep", "street", "region", "city", "state", "number"], req.body);
    if (missingFields.length) {
      return response(res, {errors: missingFields.map((field) => ({message: `${field} is required`})), status: 400});
    }
    const address = await Address.create(req.body);
    return response(res, {data: address, status: 201});
  } catch (error) {
    console.log(error);
    return errorResponse(res, error);
  }
};

const destroy: RequestHandler = async (req, res) => {
  try {
    const { addressId, clientId } = req.body;
    const address = await Address.findByPk(addressId);
    if (!address) return response(res, {errors: [{message: "Address not found"}], status: 404});
    if(address.clientId !== clientId) return response(res, {errors: [{message: "Address not found"}], status: 404});
    await address.destroy();
    return response(res, {data: address, status: 200});
  } catch (error) {
    return errorResponse(res, error);
  }
};

export { store, destroy };
