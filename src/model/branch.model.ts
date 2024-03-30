import mongoose from "mongoose";
const BranchSchema = new mongoose.Schema({
  branchcode: {
    type: String,
    // required: true,
  },
  companyname: {
    type: String,
    required: true,
  },
  branchname: {
    type: String,
    required: true,
  },
  logo: String,
  description: String,
  address: {
    line1: String,
    line2: String,
    city: String,
    pincode: Number,
  },
  mobile: String,
  emailid: String,
  defaultBranch: {
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
  updatedAt: Date,
});

BranchSchema.pre("save", async function (next) {
  try {
    if (!this.isNew) {
      return next();
    }
    const highestBranch = await mongoose
      .model("Branch")
      .findOne({}, "branchcode")
      .sort({ createdAt: -1 });
    let newBranchCode;
    if (!highestBranch) {
      newBranchCode = "BR0001";
    } else {
      const lastCode = parseInt(highestBranch.branchcode.slice(2));
      newBranchCode =
        "BR" +
        (lastCode + 1)
          .toString()
          .padStart(highestBranch.branchcode.slice(2).length, "0");
    }
    this.branchcode = newBranchCode;
    next();
  } catch (error) {
    next();
  }
});


export const BranchModel = mongoose.model("Branch", BranchSchema);
