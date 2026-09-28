import { NextFunction, Request, Response } from "express";
import { Colors } from "./colors.model";
import { appError } from "../../errors/appError";
import { colorsSchema, updateColorsSchema } from "./colors.validation";

export const createColors = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const { colorName, hexCode, status } = req.body;

    // existing
    const existingData = await Colors.findOne({
      colorName,
      hexCode,
      status,
    });

    if (existingData) {
      return next(new appError("Colors already exists", 400));
    }
    // validate data

    const validateData = await colorsSchema.parse({
      colorName,
      hexCode,
      status,
    });

    // create
    const createColors = await Colors.create(validateData);

    res.status(201).json({
      success: true,
      statusCode: 200,
      message: "Colors created successfully",
      data: createColors,
    });
  } catch (error) {
    next(error);
  }
};

export const getAllColorsData = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const getAllData = await Colors.find().sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      statusCode: 200,
      message:
        getAllData.length > 0
          ? "Colors retrieved successfully"
          : "No Colors found",
      data: getAllData,
    });
  } catch (error) {
    next(error);
  }
};

export const getColorsById = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const ColorsById = await Colors.findOne({
      _id: req.params.id,
    });

    if (!ColorsById) {
      next(new appError("Colors not found", 404));
      return;
    }
    res.json({
      success: true,
      statusCode: 200,
      message: "Colors retrieved successfully",
      data: ColorsById,
    });
    return;
  } catch (error) {
    next(error);
  }
};

export const updateColors = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const ColorsId = req.params.id;

    // validate
    const validateData = await updateColorsSchema.parse(req.body);

    const UpdateColors = await Colors.findOneAndUpdate(
      { _id: ColorsId },
      validateData,
      { new: true, runValidators: true },
    );

    if (!UpdateColors) {
      return next(new appError("Colors not found", 404));
    }

    await UpdateColors.save();

    res.status(200).json({
      success: true,
      statusCode: 200,
      message: "Colors updated successfully",
      data: UpdateColors,
    });
  } catch (error) {
    next(error);
  }
};

export const deleteColors = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const colors = await Colors.findOneAndDelete(
      {
        _id: req.params.id,
      },
      { new: true },
    );

    if (!colors) {
      return next(new appError("Colors not found", 404));
    }

    res.status(200).json({
      success: true,
      statusCode: 200,
      message: "Colors deleted successfully",
      data: colors,
    });
    return;
  } catch (error) {
    next(error);
  }
};
