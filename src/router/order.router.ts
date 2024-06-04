import express from "express";
import { store } from "../controller/order.controller.js";
import { ClientLoginMiddleware } from "../middleware/client.middlewarte.js";

const router = express.Router();

router.post("/", ClientLoginMiddleware, store);

export default router;
