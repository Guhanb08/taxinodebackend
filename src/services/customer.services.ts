import { CustomerModel } from "../model/customer.model";

export const findAllCustomer = async (query : any) => {
  return await CustomerModel.find(query).sort({ createdAt: -1 });
};

export const findOneCustomer = async (id: String) => {
  return await CustomerModel.findById(id);
};

export const findUnique = async (query: any) => {
  return await CustomerModel.findOne(query);
};

export const createCustomer = async (input: Record<string, any>) => {
  const Customer  = new CustomerModel(input);
  return await Customer.save();
};

export const updateCustomer = async (id : String , input:  Record<string, any>) => {
  return await CustomerModel.findByIdAndUpdate(id ,input ,  { new: true });
};

export const deleteCustomer = async (id: String) => {
  return await CustomerModel.findByIdAndDelete(id);
};


