import { Document } from "mongoose";

export interface ICoupons extends Document {
  couponName: string;
  status: "active" | "inactive";
  isDeleted: boolean;
  createdAt: Date;
  updatedAt: Date;
}
