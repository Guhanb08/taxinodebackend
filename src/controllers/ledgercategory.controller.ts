import { NextFunction, Request, Response } from "express";

import { createAppError } from "../utils/appError";
import {
  findAllLedgercategory,
  findOneLedgercategory,
  findUnique,
  createLedgercategory,
  updateLedgercategory,
  deleteLedgercategory,
} from "../services/ledgercategory.services";

export const findAllLedgercategoryController = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    let query  = req.query;

    const ledgercategory = await findAllLedgercategory(query);
    if (ledgercategory) {
      res.status(200).json({
        data: ledgercategory,
        message: "Ledger Category Retrived Successfully",
      });
    } else {
      throw new Error("Data Not Found");
    }
  } catch (err) {
    next(err);
  }
};

export const findOneLedgercategoryController = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { id } = req.params;
    const ledgercategory = await findOneLedgercategory(id);
    if (ledgercategory) {
      res.status(200).json({
        data: ledgercategory,
        message: "Ledger Category Retrived Successfully",
      });
    } else {
      throw new Error("Data Not Found");
    }
  } catch (err) {
    next(err);
  }
};

export const createLedgercategoryController = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    let payload = req.body;
    const existingCategory = await findUnique({ 
      category: payload.category ,
      branch: payload.branch 

    });
    if (existingCategory) {
      return next(createAppError(400, "Category Already Exists"));
    }
    const ledgercategory = await createLedgercategory({
      branch: payload.branch,
      category: payload.category,
      defaultCategory: payload.defaultCategory,
      status: payload.status,
      createdBy: payload.createdBy,
    });
    if (ledgercategory) {
      res.status(200).json({
        data: ledgercategory,
        message: "Ledger Category Created Successfully",
      });
    } else {
      throw new Error("Ledger Category Creation Failed");
    }
  } catch (err) {
    next(err);
  }
};

export const updateLedgercategoryController = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    let payload = req.body;
    const { id } = req.params;

    const existingCategory = await findUnique({ category: payload.category });
    if (existingCategory && existingCategory._id.toString()  !==  id) {
      return next(createAppError(400, "Category Already Exists"));
    }
    const ledgercategory = await updateLedgercategory(id, {
      branch: payload.branch,
      category: payload.category,
      defaultCategory: payload.defaultCategory,
      status: payload.status,
      updatedBy: payload.updatedBy,
    });
    if (ledgercategory) {
      res.status(200).json({
        data: ledgercategory,
        message: "Ledger category Updated Successfully",
      });
    } else {
      throw new Error("Ledger Category Updation Failed");
    }
  } catch (err) {
    next(err);
  }
};

export const deleteLedgercategoryController = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { id } = req.params;
    const ledgercategory = await deleteLedgercategory(id);
    if (ledgercategory) {
      res.status(200).json({
        data: ledgercategory,
        message: "Ledger Category Deleted Successfully",
      });
    } else {
      throw new Error("Data Not Found");
    }
  } catch (err) {
    next(err);
  }
};
