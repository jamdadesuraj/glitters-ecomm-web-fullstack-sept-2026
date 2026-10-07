import express from "express";
import { authMiddleware } from "../../middlewares/authMiddleware";
import { syncUser } from "./auth.controller";

const router = express.Router();

// verify Firebase token, then create the user in MongoDB if missing
router.post("/sync", authMiddleware, syncUser);

export const authRouter = router;
