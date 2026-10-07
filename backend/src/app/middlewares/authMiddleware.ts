import { Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import { DecodedIdToken } from "firebase-admin/auth";
import { User } from "../modules/auth/auth.model";
import { userInterface } from "./userInterface";
import { appError } from "../errors/appError";
import { firebaseAdminAuth } from "../config/firebase-admin"; // apni asli file ka naam/path rakhiye

export type AuthRequest = userInterface & { firebase?: DecodedIdToken };

const getToken = (req: AuthRequest): string | null => {
  const header = req.headers.authorization;
  if (!header?.startsWith("Bearer ")) return null;
  return header.split(" ")[1]?.trim() || null;
};

// Firebase user ko Mongo user se jodta hai (nahi mila to bana deta hai)
const resolveFirebaseUser = async (decoded: DecodedIdToken) => {
  let user = await User.findOne({ firebaseUid: decoded.uid });
  if (user) return user;

  // Purana account sirf VERIFIED email par link hota hai (account takeover se bachne ke liye)
  if (decoded.email && decoded.email_verified) {
    user = await User.findOne({ email: decoded.email.toLowerCase() });
    if (user) {
      user.firebaseUid = decoded.uid;
      await user.save();
      return user;
    }
  }

  // Phone login (Firebase phone verified hi hota hai)
  if (decoded.phone_number) {
    user = await User.findOne({ phone: decoded.phone_number });
    if (user) {
      user.firebaseUid = decoded.uid;
      await user.save();
      return user;
    }
  }

  try {
    return await User.create({
      firebaseUid: decoded.uid,
      name: decoded.name || decoded.email?.split("@")[0] || "Glitters User",
      email: decoded.email?.toLowerCase(),
      phone: decoded.phone_number,
      role: "user",
    });
  } catch (error) {
    // Do requests ek saath aayi to duplicate key aa sakti hai
    if ((error as { code?: number })?.code === 11000) {
      const existing = await User.findOne({ firebaseUid: decoded.uid });
      if (existing) return existing;
    }
    throw error;
  }
};

// Firebase token pehle, phir purana JWT (fallback)
const authenticate = async (token: string) => {
  let decoded: DecodedIdToken | null = null;

  try {
    decoded = await firebaseAdminAuth.verifyIdToken(token);
  } catch {
    decoded = null;
  }

  if (decoded) {
    const user = await resolveFirebaseUser(decoded);
    return { user, decoded };
  }

  if (process.env.JWT_SECRET) {
    try {
      const payload = jwt.verify(token, process.env.JWT_SECRET) as {
        userId: string;
      };
      const user = await User.findById(payload.userId);
      if (user) return { user, decoded: undefined };
    } catch {
      // invalid legacy token
    }
  }

  return null;
};

export const auth = (...requiredRoles: string[]) => {
  return async (req: AuthRequest, res: Response, next: NextFunction) => {
    try {
      const token = getToken(req);

      if (!token) {
        return next(
          new appError("Authentication required. No token provided", 401),
        );
      }

      const result = await authenticate(token);

      if (!result) {
        return next(new appError("Invalid or expired token", 401));
      }

      const { user, decoded } = result;

      req.user = user;
      req.firebase = decoded;

      if (requiredRoles.length > 0 && !requiredRoles.includes(user.role)) {
        return next(
          new appError(
            "You do not have permission to perform this action",
            403,
          ),
        );
      }

      return next();
    } catch (error) {
      return next(error);
    }
  };
};

export const optionalAuth = () => {
  return async (req: AuthRequest, res: Response, next: NextFunction) => {
    try {
      const token = getToken(req);

      if (!token) {
        req.user = undefined;
        return next();
      }

      const result = await authenticate(token);

      if (result) {
        req.user = result.user;
        req.firebase = result.decoded;
      } else {
        req.user = undefined;
      }

      return next();
    } catch (error) {
      req.user = undefined;
      return next();
    }
  };
};

// Un routes ke liye jo seedha `authMiddleware` import karte hain
export const authMiddleware = auth();
