import mongoose from "mongoose";

const UserSchema = new mongoose.Schema({
  firstname: {
    type: String,
    required: true,
  },
  lastname: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  role: {
    type: String,
    default: "User",
  },
  branch: {
    type: mongoose.Types.ObjectId,
    ref : "Branch",
    required: true,
  },
  mobile: Number,
  image: String,
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

export const UserModel = mongoose.model("User", UserSchema);
