import { Document } from "mongoose";

export interface IUser extends Document {
  firebaseUid?: string;
  name: string;
  email: string;
  phone: string;
  profileImage: string;
  isActive: boolean;
  createdAt: Date;
  updatedAt: Date;
}
