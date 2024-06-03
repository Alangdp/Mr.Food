import express from "express";
import { CompanyLoginMiddleware } from "../middleware/company.middleware.js";
import { store, deleteCategory, index } from "../controller/category.controller.js";

const router = express.Router();

router.post("/", CompanyLoginMiddleware, store);
router.get("/", CompanyLoginMiddleware, index);
router.delete("/", CompanyLoginMiddleware, deleteCategory);

export default router;
