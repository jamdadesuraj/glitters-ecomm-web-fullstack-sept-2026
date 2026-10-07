import { Response } from "express";

import { User } from "./user.model";
import { updateUserSchema } from "./user.validation";
import { AuthRequest } from "../../middlewares/authMiddleware";

// POST /api/users/sync
// Middleware pehle hi user bana/link kar chuka hota hai, yahan sirf khali fields bharte hain
export const syncUser = async (req: AuthRequest, res: Response) => {
  try {
    if (!req.user) {
      return res.status(401).json({ success: false, message: "Unauthorized" });
    }

    const user = req.user;

    const bodyName =
      typeof req.body?.name === "string" ? req.body.name.trim() : "";
    const bodyMobile =
      typeof req.body?.mobile === "string" ? req.body.mobile.trim() : "";

    let changed = false;

    if (!user.name && bodyName) {
      user.name = bodyName;
      changed = true;
    }

    if (!user.phone && bodyMobile) {
      user.phone = bodyMobile;
      changed = true;
    }

    if (changed) await user.save();

    return res.status(200).json({ success: true, data: user });
  } catch (error) {
    console.error("syncUser error:", error);
    return res
      .status(500)
      .json({ success: false, message: "Failed to sync user" });
  }
};

// GET /api/users/me
export const getMe = async (req: AuthRequest, res: Response) => {
  if (!req.user) {
    return res.status(401).json({ success: false, message: "Unauthorized" });
  }

  return res.status(200).json({ success: true, data: req.user });
};

// PATCH /api/users/me
export const updateMe = async (req: AuthRequest, res: Response) => {
  try {
    if (!req.user) {
      return res.status(401).json({ success: false, message: "Unauthorized" });
    }

    const parsed = updateUserSchema.safeParse(req.body);

    if (!parsed.success) {
      return res.status(400).json({
        success: false,
        message: parsed.error.issues[0]?.message || "Invalid data",
      });
    }

    const update: Record<string, string> = { ...parsed.data };

    if (req.file) {
      update.profileImage = req.file.path; // Cloudinary URL
    }

    const user = await User.findByIdAndUpdate(
      req.user._id,
      { $set: update },
      { new: true },
    );

    return res.status(200).json({ success: true, data: user });
  } catch (error) {
    console.error("updateMe error:", error);
    return res
      .status(500)
      .json({ success: false, message: "Failed to update profile" });
  }
};
