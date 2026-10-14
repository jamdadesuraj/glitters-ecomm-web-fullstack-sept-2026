import express from "express";
import { adminAuth } from "../../middlewares/adminAuth";
import { adminLogin, adminSignup, getAdminProfile } from "./adminController";

const router = express.Router();

router.post("/signup", adminSignup);
router.post("/signin", adminLogin);
router.get("/me", adminAuth, getAdminProfile);

export const adminAuthRouter = router;
