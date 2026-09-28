import { NextFunction, Request, Response } from "express";
import { appError } from "../../errors/appError";
import { Terms } from "./terms.model";
import { termsSchema, updateTermsSchema } from "./terms.validation";

export const createTerms = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const { badgeTitle, title, shortDesc, content } = req.body;

    // existing
    const existingData = await Terms.findOne({
      badgeTitle,
      title,
      shortDesc,
      content,
    });

    if (existingData) {
      return next(new appError("Terms already exists", 400));
    }
    // validate data

    const validateData = await termsSchema.parse({
      badgeTitle,
      title,
      shortDesc,
      content,
    });

    // create
    const createTerms = await Terms.create(validateData);

    res.status(201).json({
      success: true,
      statusCode: 200,
      message: "Terms created successfully",
      data: createTerms,
    });
  } catch (error) {
    next(error);
  }
};

export const getAllTerms = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const getAllTermsData = await Terms.find().sort({
      createdAt: -1,
    });

    res.status(200).json({
      success: true,
      statusCode: 200,
      message:
        getAllTermsData.length > 0
          ? "Terms retrieved successfully"
          : "No Terms found",
      data: getAllTermsData,
    });
  } catch (error) {
    next(error);
  }
};

export const getTermsById = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const TermsId = await Terms.findOne({
      _id: req.params.id,
    });

    if (!TermsId) {
      return next(new appError("Terms not found", 404));
    }
    res.status(200).json({
      success: true,
      statusCode: 200,
      message: "Terms retrieved successfully",
      data: TermsId,
    });
    return;
  } catch (error) {
    next(error);
  }
};

export const updateTerms = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const TermsId = req.params.id;

    // validate
    const validateData = await updateTermsSchema.parse(req.body);

    const UpdateTerms = await Terms.findOneAndUpdate(
      { _id: TermsId },
      validateData,
      {
        new: true,
        runValidators: true,
      },
    );

    if (!UpdateTerms) {
      return next(new appError("Termsnot found", 404));
    }

    await UpdateTerms.save();

    res.status(200).json({
      success: true,
      statusCode: 200,
      message: "Terms updated successfully",
      data: UpdateTerms,
    });
  } catch (error) {
    next(error);
  }
};
