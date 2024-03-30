import { NextFunction, Request, Response } from "express";

import { createUser, findUnique , findOneUser } from "../services/user.services";

import bcrypt from "bcrypt";

import { signJwt } from "../utils/jwt";

import { createAppError } from "../utils/appError";

// import { LoginUserInput, RegisterUserInput } from "../model/user.model";

export const registerUserController = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    let payload = req.body;
    const hashedPassword = await bcrypt.hash(payload.password, 12);
    const existingUser = await findUnique({ email: payload.email.toLowerCase()});
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
      createdBy: payload.createdBy
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

export const loginUserController = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    let payload = req.body;
    const user = await findUnique({ email: payload.email.toLowerCase() , status : 'Active' });
    if (!user || !(await bcrypt.compare(payload.password, user.password))) {
      return next(createAppError(400, "Invalid email or password"));
    }

    const userBranch = await findOneUser(user.id);
    const branch : any =  userBranch?.branch;
    if (branch.status == 'Inactive') {
      return next(createAppError(400, "Invalid login id"));
    }
    const jwtPayload = {
      id: user.id,
      email: user.email,
      firstname: user.firstname,
    };
    const accessToken = signJwt(jwtPayload);
    const userData = {
      _id: user._id,
      email: user.email,
      firstname: user.firstname,
      lastname: user.lastname,
      role: user.role,
      branch: user.branch,
      mobile: user.mobile,
      image: user.image,
    };
    res.status(200).json({
      userData,
      accessToken,
    });
  } catch (err) {
    next(err);
  }
};
