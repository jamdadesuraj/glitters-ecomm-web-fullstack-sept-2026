import mongoose, { Schema } from "mongoose";
import { IUser } from "./user.interface";

const userSchema = new Schema<IUser>(
  {
    // sparse: purane users ke paas firebaseUid nahi hoga, unique index tab bhi chalega
    firebaseUid: {
      type: String,
      unique: true,
      sparse: true,
      index: true,
    },

    name: { type: String, default: "", trim: true },

    email: { type: String, default: "", lowercase: true, trim: true },

    phone: { type: String, default: "", trim: true },

    profileImage: { type: String, default: "" },

    isActive: { type: Boolean, default: true },
  },
  {
    timestamps: true,
    toJSON: {
      transform: function (doc, ret: any) {
        ret.createdAt = new Date(ret.createdAt).toLocaleString("en-IN", {
          timeZone: "Asia/Kolkata",
        });

        ret.updatedAt = new Date(ret.updatedAt).toLocaleString("en-IN", {
          timeZone: "Asia/Kolkata",
        });

        return ret;
      },
    },
  },
);

export const User = mongoose.model<IUser>("User", userSchema);
