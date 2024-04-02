import { NextFunction, Request, Response } from "express";

import { createAppError } from "../utils/appError";
import {
  findAllProduct,
  findOneProduct,
  findUnique,
  createProduct,
  updateProduct,
  deleteProduct,
} from "../services/product.services";

export const findAllProductController = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    let query  = req.query;
    const product = await findAllProduct(query);
    if (product) {
      res.status(200).json({
        data: product,
        message: "Product Retrived Successfully",
      });
    } else {
      throw new Error("Data Not Found");
    }
  } catch (err) {
    next(err);
  }
};

export const findOneProductController = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { id } = req.params;
    const product = await findOneProduct(id);
    if (product) {
      res.status(200).json({
        data: product,
        message: "Product Retrived Successfully",
      });
    } else {
      throw new Error("Data Not Found");
    }
  } catch (err) {
    next(err);
  }
};

export const createProductController = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    let payload = req.body;
    const existingProduct = await findUnique({ productcode: payload.productcode , branch : payload.branch });
    if (existingProduct) {
      return next(createAppError(400, "Product Code Already Exists"));
    }
    const product = await createProduct({
      branch: payload.branch,
      productcode: payload.productcode,
      productname: payload.productname,
      image: payload.image,
      description: payload.description,
      availableqty: payload.availableqty,
      price: payload.price,
      uom: payload.uom,
      status: payload.status,
      createdBy: payload.createdBy,
    });
    if (product) {
      res.status(200).json({
        data: product,
        message: "Product Created Successfully",
      });
    } else {
      throw new Error("Product Creation Failed");
    }
  } catch (err) {
    next(err);
  }
};

export const updateProductController = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    let payload = req.body;
    const { id } = req.params;

    const existingProduct = await findUnique({ productcode: payload.productcode , branch : payload.branch});
    if (existingProduct && existingProduct._id.toString()  !==  id) {
      return next(createAppError(400, "Product Code Already Exists"));
    }

    const product = await updateProduct(id, {
      branch: payload.branch,
      productcode: payload.productcode,
      productname: payload.productname,
      image: payload.image,
      description: payload.description,
      availableqty: payload.availableqty,
      price: payload.price,
      uom: payload.uom,
      status: payload.status,
      updatedBy: payload.updatedBy,
    });
    if (product) {
      res.status(200).json({
        data: product,
        message: "Product Updated Successfully",
      });
    } else {
      throw new Error("Product Updation Failed");
    }
  } catch (err) {
    next(err);
  }
};

export const deleteProductController = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { id } = req.params;
    const product = await deleteProduct(id);
    console.log('product',product)
    if (product) {
      res.status(200).json({
        data: product,
        message: "Product Deleted Successfully",
      });
    } else {
      throw new Error("Data Not Found");
    }
  } catch (err) {
    next(err);
  }
};
