import { Request, Response, NextFunction } from "express";

interface AppError {
  statusCode: number;
  message: string;
  status: string;
  isOperational: boolean;
}

const createAppError = (
  statusCode: number = 500,
  message: string
): AppError => ({
  statusCode,
  message,
  status: `${statusCode}`.startsWith("4") ? "fail" : "error",
  isOperational: true,
});

const notFoundHandler = (req: Request, res: Response, next: NextFunction) => {
  const error = createAppError(404, `Route not found || Check Request Method `);
  next(error);
};

const errorHandler = (
  err: AppError,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const statusCode = err.statusCode || 500;
  res.status(statusCode).json({
    message: err.message,
  });
};

export { createAppError, notFoundHandler, errorHandler };
