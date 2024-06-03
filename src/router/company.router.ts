import express from "express";
import { store, login, update } from "../controller/company.controller.js";
import { CompanyLoginMiddleware } from "../middleware/company.middleware.js";

const router = express.Router();

router.post("/", store);
router.put("/", CompanyLoginMiddleware, update);
router.post("/login", login);

export default router;
