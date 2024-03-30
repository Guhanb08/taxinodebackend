import { NextFunction, Request, Response } from "express";

import { createAppError } from "../utils/appError";
import {
  findAllInvoice,
  findOneInvoice,
  findUnique,
  createInvoice,
  updateInvoice,
  deleteInvoice,
} from "../services/invoice.services";
import {
  emailInvoice , smsInvoice
} from "./sendinvoice.controller";


export const findAllInvoiceController = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    let query  = req.query;

    if(query.fromdate && query.todate ){
      let newquery = {
        createdAt: {
          $gte: query.fromdate,
          $lte: query.todate,
        },
      }
      query['createdAt'] = newquery['createdAt'];
      delete query['fromdate']; 
      delete query['todate']; 
    }
    console.log('query' , query)

    const invoice = await findAllInvoice(query);
    if (invoice) {
      res.status(200).json({
        data: invoice,
        message: "Invoice Retrived Successfully",
      });
    } else {
      throw new Error("Data Not Found");
    }
  } catch (err) {
    next(err);
  }
};

export const findOneInvoiceController = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { id } = req.params;
    const invoice = await findOneInvoice(id);
    if (invoice) {
      res.status(200).json({
        data: invoice,
        message: "Invoice Retrived Successfully",
      });
    } else {
      throw new Error("Data Not Found");
    }
  } catch (err) {
    next(err);
  }
};

export const createInvoiceController = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    let payload = req.body;
    const invoice = await createInvoice({
      branch: payload.branch,
      customer: payload.customer,
      invoicedate: payload.invoicedate,
      soldby: payload.soldby,
      notes: payload.notes,
      products: payload.products,
      subtotal: payload.subtotal,
      totaldiscount: payload.totaldiscount,
      priceafterdiscount: payload.priceafterdiscount,
      tax: payload.tax,
      totalprice: payload.totalprice,
      paymenttype: payload.paymenttype,
      status: payload.status,
      createdBy: payload.createdBy,
    });
    if (invoice) {
      res.status(200).json({
        data: invoice,
        message: "Invoice Created Successfully",
      });
    } else {
      throw new Error("Invoice Creation Failed");
    }
  } catch (err) {
    next(err);
  }
};

export const updateInvoiceController = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    let payload = req.body;
    const { id } = req.params;
    const invoice = await updateInvoice(id, {
      invoicename: payload.invoicename,
      description: payload.description,
      mobile: payload.mobile,
      emailid: payload.emailid,
      address: payload.address,
      status: payload.status,
      updatedBy: payload.updatedBy,
    });
    if (invoice) {
      res.status(200).json({
        data: invoice,
        message: "Invoice Updated Successfully",
      });
    } else {
      throw new Error("Invoice Updation Failed");
    }
  } catch (err) {
    next(err);
  }
};

export const deleteInvoiceController = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { id } = req.params;
    const invoice = await deleteInvoice(id);
    if (invoice) {
      res.status(200).json({
        data: invoice,
        message: "Invoice Deleted Successfully",
      });
    } else {
      throw new Error("Data Not Found");
    }
  } catch (err) {
    next(err);
  }
};





export const sendEmailInvoiceController = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { id } = req.params;
    const invoice = await findOneInvoice(id);
    const emailSend = await emailInvoice(invoice) ;
    console.log('emailSend' ,emailSend);
    if (emailSend)   {
      res.status(200).json({
        data: invoice,
        message: "Email Sent Successfully",
      });
    } else {
      throw new Error("Error while sending invoice.");
    }
  } catch (err) {
    next(err);
  }
};



export const sendSmsInvoiceController = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { id } = req.params;
    const invoice = await findOneInvoice(id);
    const smsSend = await smsInvoice(invoice)  ;
    console.log('smsSend' , smsSend);
    if (smsSend)   {
      res.status(200).json({
        data: invoice,
        message: "SMS Sent Successfully",
      });
    } else {
      throw new Error("Error while sending invoice.");
    }
  } catch (err) {
    next(err);
  }
};





export const createInstantInvoiceController = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    let payload = req.body;
    const invoice = await createInvoice({
      branch: payload.branch,
      customer: payload.customer,
      invoicedate: payload.invoicedate,
      soldby: payload.soldby,
      notes: payload.notes,
      products: payload.products,
      subtotal: payload.subtotal,
      totaldiscount: payload.totaldiscount,
      priceafterdiscount: payload.priceafterdiscount,
      tax: payload.tax,
      totalprice: payload.totalprice,
      paymenttype: payload.paymenttype,
      status: payload.status,
      createdBy: payload.createdBy,
    });
    if (invoice) {
      res.status(200).json({
        data: invoice,
        message: "Invoice Created Successfully",
      });
    } else {
      throw new Error("Invoice Creation Failed");
    }
  } catch (err) {
    next(err);
  }
};