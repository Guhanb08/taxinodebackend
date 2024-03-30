import { NextFunction, Request, Response } from "express";
import bcrypt from "bcrypt";

import { createAppError } from "../utils/appError";
import {
  findAllUser,
  findOneUser,
  findUnique,
  createUser,
  updateUser,
  deleteUser,
} from "../services/user.services";

export const findAllUserController = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const user = await findAllUser();
    if (user) {
      res.status(200).json({
        data: user,
        message: "User Retrived Successfully",
      });
    } else {
      throw new Error("Data Not Found");
    }
  } catch (err) {
    next(err);
  }
};

export const findOneUserController = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { id } = req.params;
    const user = await findOneUser(id);
    if (user) {
      res.status(200).json({
        data: user,
        message: "User Retrived Successfully",
      });
    } else {
      throw new Error("Data Not Found");
    }
  } catch (err) {
    next(err);
  }
};

export const createUserController = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    let payload = req.body;
    const hashedPassword = await bcrypt.hash(payload.password, 12);
    const existingUser = await findUnique({
      email: payload.email.toLowerCase(),
    });
    if (existingUser) {
      return next(createAppError(400, "Email Id Already Registered"));
    }
    const user = await createUser({
      firstname: payload.firstname,
      lastname: payload.lastname,
      email: payload.email.toLowerCase(),
      password: hashedPassword,
      role: payload.role,
      branch: payload.branch,
      mobile: payload.mobile,
      image: payload.image,
      status: payload.status,
      createdBy: payload.createdBy,
    });
    if (user) {
      res.status(200).json({
        message: "User Registered Successfully",
      });
    } else {
      throw new Error("User Registration Failed");
    }
  } catch (err) {
    next(err);
  }
};

export const updateUserController = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    let payload = req.body;
    const { id } = req.params;
    let updatePayload : any = {
      firstname: payload.firstname,
      lastname: payload.lastname,
      role: payload.role,
      mobile: payload.mobile,
      image: payload.image,
      status: payload.status,
      updatedBy: payload.updatedBy,
    }
    if(payload.changePassword){
    const hashedPassword = await bcrypt.hash(payload.password, 12);
      updatePayload.password =  hashedPassword;
    }
    const user = await updateUser(id, updatePayload);
    if (user) {
      res.status(200).json({
        data: user,
        message: "User Updated Successfully",
      });
    } else {
      throw new Error("User Updation Failed");
    }
  } catch (err) {
    next(err);
  }
};

export const deleteUserController = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { id } = req.params;
    const user = await deleteUser(id);
    console.log("user", user);
    if (user) {
      res.status(200).json({
        data: user,
        message: "User Deleted Successfully",
      });
    } else {
      throw new Error("Data Not Found");
    }
  } catch (err) {
    next(err);
  }
};
