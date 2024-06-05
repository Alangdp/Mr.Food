import express from "express";
import { store, destroy } from "../controller/address.controller.js";
import { ClientLoginMiddleware } from "../middleware/client.middlewarte.js";

const router = express.Router();

router.post("/", ClientLoginMiddleware, store);
router.delete("/", ClientLoginMiddleware, destroy);

export default router;
