import { InvoiceModel } from "../model/invoice.model";

export const findAllInvoice = async (query : any) => {
  return await InvoiceModel.find(query).populate('customer').populate('soldby').sort({ createdAt: -1 });
};

export const findOneInvoice = async (id: String) => {
  return await InvoiceModel.findById(id).populate('customer').populate('soldby').populate('branch');
};

export const findUnique = async (query: any) => {
  return await InvoiceModel.findOne(query);
};

export const createInvoice = async (input: Record<string, any>) => {
  const Invoice  = new InvoiceModel(input);
  return await Invoice.save();
};

export const updateInvoice = async (id : String , input:  Record<string, any>) => {
  return await InvoiceModel.findByIdAndUpdate(id ,input ,  { new: true });
};

export const deleteInvoice = async (id: String) => {
  return await InvoiceModel.findByIdAndDelete(id);
};


