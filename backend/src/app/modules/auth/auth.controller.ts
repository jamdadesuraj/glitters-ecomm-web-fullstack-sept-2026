import { Request, Response } from "express";
import { User } from "./auth.model";

export const syncUser = async (req: Request, res: Response) => {
  try {
    if (!req.user?.uid) {
      return res.status(401).json({
        success: false,
        message: "Unauthorized",
      });
    }

    const { uid, email, phone } = req.user;

    // Atomic: no duplicate users if two requests arrive at the same time
    const user = await User.findOneAndUpdate(
      { firebaseUid: uid },
      {
        $setOnInsert: {
          firebaseUid: uid,
          email: email || "",
          phone: phone || "",
        },
      },
      { new: true, upsert: true },
    );

    return res.status(200).json({
      success: true,
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
