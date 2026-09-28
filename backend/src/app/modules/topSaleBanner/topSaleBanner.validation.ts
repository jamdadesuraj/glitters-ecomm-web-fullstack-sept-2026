import z from "zod";

export const topSaleBannerSchema = z.object({
  offerBannerImg1: z.string().trim().min(1, "Offer banner image is required"),
  offerBannerImg2: z.string().trim().min(1, "Offer banner image is required"),
  offerBannerImg3: z.string().trim().min(1, "Offer banner image is required"),

  status: z.enum(["active", "inactive"]).optional().default("active"),

  isDeleted: z.boolean().optional().default(false),
});

export const updateTopSaleBannerSchema = topSaleBannerSchema.partial();
