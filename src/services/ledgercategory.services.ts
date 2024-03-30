import { LedgercategoryModel } from "../model/ledgercategory.model";

export const findAllLedgercategory = async (query : any) => {
  return await LedgercategoryModel.find(query).sort({ createdAt: -1 });
};

export const findOneLedgercategory = async (id: String) => {
  return await LedgercategoryModel.findById(id);
};

export const findUnique = async (query: any) => {
  return await LedgercategoryModel.findOne(query);
};

export const createLedgercategory = async (input: Record<string, any>) => {
  const Ledgercategory  = new LedgercategoryModel(input);
  return await Ledgercategory.save();
};

export const updateLedgercategory = async (id : String , input:  Record<string, any>) => {
  return await LedgercategoryModel.findByIdAndUpdate(id ,input ,  { new: true });
};

export const deleteLedgercategory = async (id: String) => {
  return await LedgercategoryModel.findByIdAndDelete(id);
};


