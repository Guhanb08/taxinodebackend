import { LedgerModel } from "../model/ledger.model";

export const findAllLedger = async (query : any) => {
  return await LedgerModel.find(query).sort({ createdAt: -1 });
};


export const findOneLedger = async (id: String) => {
  return await LedgerModel.findById(id);
};

export const findUnique = async (query: any) => {
  return await LedgerModel.findOne(query);
};

export const createLedger = async (input: Record<string, any>) => {
  const Ledger  = new LedgerModel(input);
  return await Ledger.save();
};

export const updateLedger = async (id : String , input:  Record<string, any>) => {
  return await LedgerModel.findByIdAndUpdate(id ,input ,  { new: true });
};

export const deleteLedger = async (id: String) => {
  return await LedgerModel.findByIdAndDelete(id);
};


