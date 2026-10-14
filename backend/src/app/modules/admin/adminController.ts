import { NextFunction, Request, Response } from "express";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import z from "zod";
import { appError } from "../../errors/appError";
import { Admin } from "./admin.model";

const signupSchema = z.object({
  name: z.string().min(1, "Name is required").trim(),
  email: z.string().email("Invalid email").toLowerCase().trim(),
  password: z.string().min(8, "Password must be at least 8 characters"),
});

const loginSchema = z.object({
  email: z.string().email("Invalid email").toLowerCase().trim(),
  password: z.string().min(1, "Password is required"),
});

const signToken = (id: string, role: string) =>
  jwt.sign({ id, role }, process.env.JWT_SECRET!, {
    expiresIn: (process.env.JWT_EXPIRES_IN || "1d") as any,
  });

// POST /v1/api/admin-auth/signup
export const adminSignup = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const parsed = signupSchema.safeParse(req.body);
    if (!parsed.success) {
      return next(new appError(parsed.error.issues[0].message, 400));
    }
    const { name, email, password } = parsed.data;

    if (await Admin.findOne({ email })) {
      return next(new appError("Admin already exists with this email", 400));
    }

    const hashed = await bcrypt.hash(password, 10);
    const admin = await Admin.create({ name, email, password: hashed });

    const token = signToken(admin.id, admin.role);

    res.status(201).json({
      success: true,
      statusCode: 201,
      message: "Admin registered successfully",
      token,
      data: {
        _id: admin._id,
        name: admin.name,
        email: admin.email,
        role: admin.role,
        status: admin.status,
      },
    });
  } catch (error) {
    next(error);
  }
};

// POST /v1/api/admin-auth/signin
export const adminLogin = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const parsed = loginSchema.safeParse(req.body);
    if (!parsed.success) {
      return next(new appError(parsed.error.issues[0].message, 400));
    }
    const { email, password } = parsed.data;

    const admin = await Admin.findOne({ email }).select("+password");
    // same message for both cases so attackers can't tell which was wrong
    if (!admin || !(await bcrypt.compare(password, admin.password))) {
      return next(new appError("Invalid email or password", 401));
    }
    if (admin.status !== "active") {
      return next(new appError("Account is not active", 403));
    }

    const token = signToken(admin.id, admin.role);

    res.status(200).json({
      success: true,
      statusCode: 200,
      message: "Login successful",
      token,
      data: {
        _id: admin._id,
        name: admin.name,
        email: admin.email,
        role: admin.role,
        status: admin.status,
      },
    });
  } catch (error) {
    next(error);
  }
};

// GET /v1/api/admin-auth/me  (needs adminAuth)
export const getAdminProfile = async (req: Request, res: Response) => {
  res.status(200).json({ success: true, data: (req as any).admin });
};
