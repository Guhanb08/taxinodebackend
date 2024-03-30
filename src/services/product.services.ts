import { ProductModel } from "../model/product.model";

export const findAllProduct = async (query : any) => {
  return await ProductModel.find(query).sort({ createdAt: -1 });
};

export const findOneProduct = async (id: String) => {
  return await ProductModel.findById(id);
};

export const findUnique = async (query: any) => {
  return await ProductModel.findOne(query);
};

export const createProduct = async (input: Record<string, any>) => {
  const Product  = new ProductModel(input);
  return await Product.save();
};

export const updateProduct = async (id : String , input:  Record<string, any>) => {
  return await ProductModel.findByIdAndUpdate(id ,input ,  { new: true });
};

export const deleteProduct = async (id: String) => {
  return await ProductModel.findByIdAndDelete(id);
};


