import { Request, Response } from "express";
import { User } from "./auth.model";

const PHONE_REGEX = /^\+91[6-9]\d{9}$/;

export const syncUser = async (req: Request, res: Response) => {
  try {
    // Firebase UID comes ONLY from verified token
    const uid = req.user?.uid;

    if (!uid) {
      return res.status(401).json({
        success: false,
        message: "Unauthorized",
      });
    }

    const email = req.user?.email || "";
    const tokenPhone = req.user?.phone || "";

    const name = typeof req.body?.name === "string" ? req.body.name.trim() : "";

    const bodyPhone =
      typeof req.body?.phone === "string" ? req.body.phone.trim() : "";

    // Validate name
    if (name.length > 100) {
      return res.status(400).json({
        success: false,
        message: "Name is too long",
      });
    }

    // Validate body phone
    if (bodyPhone && !PHONE_REGEX.test(bodyPhone)) {
      return res.status(400).json({
        success: false,
        message: "Invalid phone number",
      });
    }

    // Firebase verified phone has priority
    const phone = tokenPhone || bodyPhone;

    const updateData: Record<string, string> = {};

    if (email) {
      updateData.email = email;
    }

    if (phone) {
      updateData.phone = phone;
    }

    if (name) {
      updateData.name = name;
    }

    const user = await User.findOneAndUpdate(
      {
        firebaseUid: uid,
      },
      {
        $setOnInsert: {
          firebaseUid: uid,
        },

        ...(Object.keys(updateData).length
          ? {
              $set: updateData,
            }
          : {}),
      },
      {
        new: true,
        upsert: true,
        setDefaultsOnInsert: true,
        runValidators: true,
      },
    );

    return res.status(200).json({
      success: true,
      message: "User synced successfully",
      data: user,
    });
  } catch (error) {
    console.error("syncUser error:", error);

    return res.status(500).json({
      success: false,
      message: "Failed to sync user",
    });
  }
};

export const getMe = async (req: Request, res: Response) => {
  try {
    const uid = req.user?.uid;

    if (!uid) {
      return res.status(401).json({
        success: false,
        message: "Unauthorized",
      });
    }

    const user = await User.findOne({
      firebaseUid: uid,
      isActive: true,
    });

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    return res.status(200).json({
      success: true,
      message: "User fetched successfully",
      data: user,
    });
  } catch (error) {
    console.error("getMe error:", error);

    return res.status(500).json({
      success: false,
      message: "Failed to fetch user",
    });
  }
};
