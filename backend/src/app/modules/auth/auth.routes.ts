import express from "express";

import { authMiddleware } from "../../middlewares/authMiddleware";

import { syncUser, getMe } from "./auth.controller";

const router = express.Router();

router.post("/sync", authMiddleware, syncUser);

router.get("/me", authMiddleware, getMe);

export const authRouter = router;
