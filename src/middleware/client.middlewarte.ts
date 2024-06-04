import { RequestHandler } from "express";
import jwt, { JwtPayload } from 'jsonwebtoken';
import { errorResponse } from "../utils/responses.js";
import { configDotenv } from "dotenv";

configDotenv();
const SECRET = process.env.SECRET_CLIENT as string;

const ClientLoginMiddleware: RequestHandler = async (req, res, next) => {
  try {
    const token: string | undefined = req.headers.authorization;
    if (!token) return errorResponse(res, { message: 'Token not provided' });
    const { id } = jwt.verify(token, SECRET) as JwtPayload;
    req.body.clientId = id as number;
    next();
  } catch (error) {
    return errorResponse(res, error);
  }
};

export { ClientLoginMiddleware };
