import { BranchModel } from "../model/branch.model";

export const findAllBranch = async (query : any) => {
  return await BranchModel.find(query).sort({ createdAt: -1 });
};

export const findOneBranch = async (id: String) => {
  return await BranchModel.findById(id);
};

export const findUnique = async (query: any) => {
  return await BranchModel.findOne(query);
};

export const createBranch = async (input: Record<string, any>) => {
  const Branch  = new BranchModel(input);
  return await Branch.save();
};

export const updateBranch = async (id : String , input:  Record<string, any>) => {
  return await BranchModel.findByIdAndUpdate(id ,input ,  { new: true });
};

export const deleteBranch = async (id: String) => {
  return await BranchModel.findByIdAndDelete(id);
};


