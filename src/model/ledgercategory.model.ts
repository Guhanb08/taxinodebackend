import mongoose from "mongoose";
const LedgercategorySchema = new mongoose.Schema({
  branch: {
    type: mongoose.Types.ObjectId,
    ref: "Branch",
    required: true,
  },
  category: {
    type: String,
    required: true,
  },
  defaultCategory: {
    type: Boolean,
    default: false,
  },
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
});


export const LedgercategoryModel = mongoose.model("Ledgercategory", LedgercategorySchema);
