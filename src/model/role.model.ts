import mongoose from "mongoose";

const RoleSchema = new mongoose.Schema({
  // Admin, Manager, User
  role: {
    type: String,
    required: true,
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

export const RoleModel = mongoose.model("Role", RoleSchema);
