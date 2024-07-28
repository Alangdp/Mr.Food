import { RequestHandler } from 'express';
import jwt, { JwtPayload } from 'jsonwebtoken';
import { errorResponse } from '../utils/responses.js';
import { configDotenv } from 'dotenv';

configDotenv();

const SECRET = process.env.SECRET as string;

const CompanyLoginMiddleware: RequestHandler = async (req, res, next) => {
  try {
    const token: string | undefined = req.headers.authorization;
    if (!token) return errorResponse(res, { message: 'Token not provided' });
    const { id } = jwt.verify(token, SECRET) as JwtPayload;
    req.body.id = id as number;
    next();
  } catch (error) {
    console.log(error);
    return errorResponse(res, error);
  }
};

export { CompanyLoginMiddleware };
