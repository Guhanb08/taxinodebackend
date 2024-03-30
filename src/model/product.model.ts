import mongoose from "mongoose";
const ProductSchema = new mongoose.Schema({
  branch: {
    type: mongoose.Types.ObjectId,
    ref: "Branch",
    required: true,
  },
  productcode: {
    type: String,
    required: true,
  },
  productname: {
    type: String,
    required: true,
  },
  image: String,
  price: {
    type: Number,
    required: true,
  },
  availableqty: {
    type: Number,
    required: true,
  },
  uom: {
    type: String,
    required: true,
  },
  description: String,
  status: {
    type: String,
    default: "Active",
  },
  createdBy: String,
  updatedBy: String,
  createdAt: {  
    type: Date,
    default: Date.now,
  },
  updatedAt: Date,
});



export const ProductModel = mongoose.model("Product", ProductSchema);
