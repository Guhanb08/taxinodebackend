import { NextFunction, Request, Response } from "express";

import { createAppError } from "../utils/appError";
import {
  findAllCompany,
  findOneCompany,
  findUnique,
  createCompany,
  updateCompany,
  deleteCompany,
} from "../services/company.services";

export const findAllCompanyController = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const company = await findAllCompany();
    if (company) {
      res.status(200).json({
        data: company,
        message: "Company Retrived Successfully",
      });
    } else {
      throw new Error("Data Not Found");
    }
  } catch (err) {
    next(err);
  }
};

export const findOneCompanyController = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { id } = req.params;
    const company = await findOneCompany(id);
    if (company) {
      res.status(200).json({
        data: company,
        message: "Company Retrived Successfully",
      });
    } else {
      throw new Error("Data Not Found");
    }
  } catch (err) {
    next(err);
  }
};

export const createCompanyController = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    let payload = req.body;
    const company = await createCompany({
      companyname: payload.companyname,
      logo: payload.logo,
      description: payload.description,
      mobile: payload.mobile,
      emailid: payload.emailid,
      address: payload.address,
      status: payload.status,
      createdBy: payload.createdBy,
    });
    if (company) {
      res.status(200).json({
        data: company,
        message: "Company Created Successfully",
      });
    } else {
      throw new Error("Company Creation Failed");
    }
  } catch (err) {
    next(err);
  }
};

export const updateCompanyController = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    let payload = req.body;
    const { id } = req.params;
    const company = await updateCompany(id, {
      companyname: payload.companyname,
      description: payload.description,
      logo: payload.logo,
      mobile: payload.mobile,
      emailid: payload.emailid,
      address: payload.address,
      status: payload.status,
      updatedBy: payload.updatedBy,
    });
    if (company) {
      res.status(200).json({
        data: company,
        message: "Company Updated Successfully",
      });
    } else {
      throw new Error("Company Updation Failed");
    }
  } catch (err) {
    next(err);
  }
};

export const deleteCompanyController = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { id } = req.params;
    const company = await deleteCompany(id);
    if (company) {
      res.status(200).json({
        data: company,
        message: "Company Deleted Successfully",
      });
    } else {
      throw new Error("Data Not Found");
    }
  } catch (err) {
    next(err);
  }
};
