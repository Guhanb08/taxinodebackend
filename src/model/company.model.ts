import mongoose from "mongoose";
const CompanySchema = new mongoose.Schema({
  companyname: {
    type: String,
    required: true,
  },
  logo: String,
  description: String,
  mobile: String,
  emailid: String,
  address: {
    line1: String,
    line2: String,
    city: String,
    pincode: Number,
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
  updatedAt: Date,
});



export const CompanyModel = mongoose.model("Company", CompanySchema);
