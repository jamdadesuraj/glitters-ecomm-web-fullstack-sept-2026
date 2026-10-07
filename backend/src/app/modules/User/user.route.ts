import express from "express";

import { upload } from "../../config/cloudinary";
import { syncUser, getMe, updateMe } from "./user.controller";
import { auth } from "../../middlewares/authMiddleware";

const router = express.Router();

router.post("/sync", auth(), syncUser);
router.get("/me", auth(), getMe);
router.patch("/me", auth(), upload.single("image"), updateMe);

export const userRouter = router;
