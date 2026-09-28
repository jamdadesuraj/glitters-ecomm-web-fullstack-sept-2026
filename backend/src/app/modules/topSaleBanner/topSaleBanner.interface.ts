import { Document } from "mongoose";

export interface ITopSaleBanner extends Document {
  offerBannerImg1: string;
  offerBannerImg2: string;
  offerBannerImg3: string;

  status: "active" | "inactive";

  isDeleted: boolean;

  createdAt: Date;
  updatedAt: Date;
}
