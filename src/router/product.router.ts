import express from "express";
import { store } from "../controller/product.controller.js";
import { CompanyLoginMiddleware } from "../middleware/company.middleware.js";

const router = express.Router();

router.post("/", CompanyLoginMiddleware, store);

export default router;
