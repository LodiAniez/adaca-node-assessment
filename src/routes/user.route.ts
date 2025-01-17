import express from "express";
import { createUser } from "../controllers/user.controller";
import { authenticateToken } from "../middlewares/auth.middleware";

const router = express.Router();

router.post("/", authenticateToken, createUser);

export default router;
