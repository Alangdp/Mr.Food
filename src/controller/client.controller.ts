import { RequestHandler } from "express";
import { errorResponse, response } from "../utils/responses.js";
import Client from "../models/Client.js";
import { createToken } from "../utils/token.js";
import { configDotenv } from "dotenv";

configDotenv();

const store: RequestHandler = async (req, res) => {
  try {
    const requiredFields = ["phone", "name"];
    const missingFields = requiredFields.filter((field) => !req.body[field]);
    if (missingFields.length) {
      return response(res, {errors: missingFields.map((field) => ({message: `${field} is required`})), status: 400});
    }
    const clientDB = await Client.findByPhone(req.body.phone);
    if(clientDB) return response(res, {errors: [{message: "Phone number already exists"}], status: 400});
    const client = await Client.create({
      name: req.body.name,
      phoneNumber: req.body.phone,
    });
    return response(res, {data: client, status: 201});
  } catch (error) {
    return errorResponse(res, error);
  }
};

const update: RequestHandler = async (req, res) => {
  try {
    const { phone } = req.params;
    const { name } = req.body;
    const client = await Client.findByPhone(phone);
    if (!client) return response(res, {errors: [{message: "Client not found"}], status: 404});
    (await client.update({name})).save();

    return response(res, {data: client, status: 200});
  } catch (error) {
    return errorResponse(res, error);
  }
};

const login: RequestHandler = async (req, res) => {
  try {
    const { phone } = req.body;
    const client = await Client.findByPhone(phone);
    if (!client) return response(res, {errors: [{message: "Invalid Phone"}], status: 404});
    const token = createToken(client.dataValues.id, process.env.SECRET_CLIENT as string);
    return response(res, {data: token, status: 200});
  } catch (error) {
    return errorResponse(res, error);
  }
};

export {store, login, update};
