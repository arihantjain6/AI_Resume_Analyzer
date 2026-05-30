import express from "express";
import { loginUser, logoutUser, registerUser, getUser } from "../controllers/auth.controller.js";
import { authMiddleware } from "../middlewares/auth.middleware.js";
const router = express.Router();

router.post("/register", registerUser);
router.post("/login", loginUser);
router.post("/logout", logoutUser);

router.get("/get-me", authMiddleware, getUser);

export default router; 