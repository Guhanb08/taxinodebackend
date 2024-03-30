
import config from "../config/index";
import mongoose from "mongoose";
export const connectDB = async () => {
  try {
    await mongoose.connect(config.DB_URL!);
  } catch (error) {
  }
};
import './branch.model';
import './user.model';
import './role.model';
import './ledgercategory.model';
import './product.model';
import './customer.model';
import './company.model';






