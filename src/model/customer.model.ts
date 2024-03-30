import mongoose from "mongoose";
const CustomerSchema = new mongoose.Schema({
  branch: {
    type: mongoose.Types.ObjectId,
    ref: "Branch",
    required: true,
  },
  customercode: {
    type: String,
  },
  customername: {
    type: String,
    required: true,
  },
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

CustomerSchema.pre("save", async function (next) {
  try {
    if (!this.isNew) {
      return next();
    }
    const highestCustomer = await mongoose
      .model("Customer")
      .findOne({branch: this.branch}, "customercode")
      .sort({ createdAt: -1 });
    let newCustomerCode;
    if (!highestCustomer) {
      newCustomerCode = "CS0001";
    } else {
      const lastCode = parseInt(highestCustomer.customercode.slice(2));
      newCustomerCode =
        "CS" +
        (lastCode + 1)
          .toString()
          .padStart(highestCustomer.customercode.slice(2).length, "0");
    }
    this.customercode = newCustomerCode;
    next();
  } catch (error) {
    next();
  }
});


export const CustomerModel = mongoose.model("Customer", CustomerSchema);
