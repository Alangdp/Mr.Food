import express from "express";
import { destroy, index, login, store, update } from "../controller/user.controller.js";

const router = express.Router();

router.get("/", index);
router.post("/", store);
router.put("/", update);
router.delete("/", destroy);
router.post("/login", login);

export default router;
