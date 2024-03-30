import { NextFunction, Request, Response } from "express";

import { createAppError } from "../utils/appError";
import {
  findAllCustomer,
  findOneCustomer,
  findUnique,
  createCustomer,
  updateCustomer,
  deleteCustomer,
} from "../services/customer.services";

export const findAllCustomerController = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    let query  = req.query;
    const customer = await findAllCustomer(query);
    if (customer) {
      res.status(200).json({
        data: customer,
        message: "Customer Retrived Successfully",
      });
    } else {
      throw new Error("Data Not Found");
    }
  } catch (err) {
    next(err);
  }
};

export const findOneCustomerController = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { id } = req.params;
    const customer = await findOneCustomer(id);
    if (customer) {
      res.status(200).json({
        data: customer,
        message: "Customer Retrived Successfully",
      });
    } else {
      throw new Error("Data Not Found");
    }
  } catch (err) {
    next(err);
  }
};

export const createCustomerController = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    let payload = req.body;
    const customer = await createCustomer({
      branch: payload.branch,
      customername: payload.customername,
      description: payload.description,
      mobile: payload.mobile,
      emailid: payload.emailid,
      address: payload.address,
      status: payload.status,
      createdBy: payload.createdBy,
    });
    if (customer) {
      res.status(200).json({
        data: customer,
        message: "Customer Created Successfully",
      });
    } else {
      throw new Error("Customer Creation Failed");
    }
  } catch (err) {
    next(err);
  }
};

export const updateCustomerController = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    let payload = req.body;
    const { id } = req.params;
    const customer = await updateCustomer(id, {
      branch: payload.branch,
      customername: payload.customername,
      description: payload.description,
      mobile: payload.mobile,
      emailid: payload.emailid,
      address: payload.address,
      status: payload.status,
      updatedBy: payload.updatedBy,
    });
    if (customer) {
      res.status(200).json({
        data: customer,
        message: "Customer Updated Successfully",
      });
    } else {
      throw new Error("Customer Updation Failed");
    }
  } catch (err) {
    next(err);
  }
};

export const deleteCustomerController = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { id } = req.params;
    const customer = await deleteCustomer(id);
    if (customer) {
      res.status(200).json({
        data: customer,
        message: "Customer Deleted Successfully",
      });
    } else {
      throw new Error("Data Not Found");
    }
  } catch (err) {
    next(err);
  }
};
