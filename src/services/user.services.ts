import { UserModel } from "../model/user.model";

export const findAllUser = async () => {
  return await UserModel.find().populate('branch');
};

export const findOneUser = async (id: String) => {
  return await UserModel.findById(id).populate('branch');
};

export const findUnique = async (query: any) => {
  return await UserModel.findOne(query);
};

export const createUser = async (input: Record<string, any>) => {
  const User  = new UserModel(input);
  return await User.save();
};

export const updateUser = async (id : String , input:  Record<string, any>) => {
  return await UserModel.findByIdAndUpdate(id ,input ,  { new: true });
};

export const deleteUser = async (id: String) => {
  return await UserModel.findByIdAndDelete(id);
};


