import express from "express";
import { login, store, update } from "../controller/client.controller.js";

const router = express.Router();

router.post("/", store);
router.post("/login", login);
router.put("/:phone", update);

export default router;
