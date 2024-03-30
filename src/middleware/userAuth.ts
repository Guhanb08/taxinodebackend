import { Request, Response, NextFunction } from "express";
import { verifyJwt } from "../utils/jwt";
import { createAppError } from "../utils/appError";

const authMiddleware = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const isAuthorized = await verifyJwt(req);
    if (isAuthorized) {
      return next();
    }
  } catch (err) {
    return next(createAppError(403, "Not Authorized"));
  }
};

export default authMiddleware;
