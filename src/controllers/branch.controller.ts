import { NextFunction, Request, Response } from "express";

import { createAppError } from "../utils/appError";
import {
  findAllBranch,
  findOneBranch,
  findUnique,
  createBranch,
  updateBranch,
  deleteBranch,
} from "../services/branch.services";

export const findAllBranchController = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    let query  = req.query;

    const branch = await findAllBranch(query);
    if (branch) {
      res.status(200).json({
        data: branch,
        message: "Branch Retrived Successfully",
      });
    } else {
      throw new Error("Data Not Found");
    }
  } catch (err) {
    next(err);
  }
};

export const findOneBranchController = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { id } = req.params;
    const branch = await findOneBranch(id);
    if (branch) {
      res.status(200).json({
        data: branch,
        message: "Branch Retrived Successfully",
      });
    } else {
      throw new Error("Data Not Found");
    }
  } catch (err) {
    next(err);
  }
};

export const createBranchController = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    let payload = req.body;
    const existingBranch = await findUnique({ branchcode: payload.branchcode });
    if (existingBranch) {
      return next(createAppError(400, "Branch Code Already Exists"));
    }
    const branch = await createBranch({
      companyname: payload.companyname,
      logo: payload.logo,
      branchcode: payload.branchcode,
      branchname: payload.branchname,
      description: payload.description,
      address: {
        line1: payload.address.line1,
        line2: payload.address.line2,
        city: payload.address.city,
        pincode: payload.address.pincode,
      },
      mobile: payload.mobile,
      emailid: payload.emailid,
      defaultBranch: payload.defaultBranch,
      status: payload.status,
      createdBy: payload.createdBy,
    });
    if (branch) {
      res.status(200).json({
        data: branch,
        message: "Branch Created Successfully",
      });
    } else {
      throw new Error("Branch Creation Failed");
    }
  } catch (err) {
    next(err);
  }
};

export const updateBranchController = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    let payload = req.body;
    const { id } = req.params;
    const branch = await updateBranch(id, {
      companyname: payload.companyname,
      logo: payload.logo,
      branchname: payload.branchname,
      description: payload.description,
      address: {
        line1: payload.address.line1,
        line2: payload.address.line2,
        city: payload.address.city,
        pincode: payload.address.pincode,
      },
      mobile: payload.mobile,
      emailid: payload.emailid,
      defaultBranch: payload.defaultBranch,
      status: payload.status,
      updatedBy: payload.updatedBy,
    });
    if (branch) {
      res.status(200).json({
        data: branch,
        message: "Branch Updated Successfully",
      });
    } else {
      throw new Error("Branch Updation Failed");
    }
  } catch (err) {
    next(err);
  }
};

export const deleteBranchController = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { id } = req.params;
    const branch = await deleteBranch(id);
    console.log('branch',branch)
    if (branch) {
      res.status(200).json({
        data: branch,
        message: "Branch Deleted Successfully",
      });
    } else {
      throw new Error("Data Not Found");
    }
  } catch (err) {
    next(err);
  }
};
