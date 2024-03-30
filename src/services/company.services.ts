import { CompanyModel } from "../model/company.model";

export const findAllCompany = async () => {
  return await CompanyModel.find().sort({ createdAt: -1 });
};

export const findOneCompany = async (id: String) => {
  return await CompanyModel.findById(id);
};

export const findUnique = async (query: any) => {
  return await CompanyModel.findOne(query);
};

export const createCompany = async (input: Record<string, any>) => {
  const Company  = new CompanyModel(input);
  return await Company.save();
};

export const updateCompany = async (id : String , input:  Record<string, any>) => {
  return await CompanyModel.findByIdAndUpdate(id ,input ,  { new: true });
};

export const deleteCompany = async (id: String) => {
  return await CompanyModel.findByIdAndDelete(id);
};


