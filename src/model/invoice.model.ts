import mongoose from "mongoose";
const InvoiceSchema = new mongoose.Schema({
  branch: {
    type: mongoose.Types.ObjectId,
    ref: "Branch",
    required: true,
  },
  customer: {
    type: mongoose.Types.ObjectId,
    ref: "Customer",
    required: true,
  },
  invoiceno: {
    type: String,
  },

  invoicedate: Date,

  soldby: {
    type: mongoose.Types.ObjectId,
    ref: "User",
    required: true,
  },

  notes: String,
  products: [
    {
      productcode: {
        type: String,
        // required: true,
      },
      productname: {
        type: String,
        required: true,
      },
      price: {
        type: Number,
        required: true,
      },
      qty: {
        type: Number,
        required: true,
      },
      discounttype :{
        type: String,
        default: 'Percentage',
        // Percentage , Amount  
      },
      discount: {
        type: Number,
        default: 0,
      },
      discountprice: {
        type: Number,
        default: 0,
      },
      totalprice: {
        type: Number,
        default: 0,
      },
      uom: {
        type: String,
        required: true,
      },
      description: String,
    },
  ],

  subtotal: {
    type: Number,
    required: true,
    default: 0,
  },
  totaldiscount: {
    type: Number,
    default: 0,
  },
  priceafterdiscount: {
    type: Number,
    required: true,
    default: 0,
  },
  tax: {
    type: Number,
    default: 0,
  },
  totalprice: {
    type: Number,
    required: true,
    default: 0,
  },
  paymenttype: {
    type: String,
    default: "Cash",
    // Cash , Net Banking , UPI , Bank Transfer , Paypal
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




InvoiceSchema.pre("save", async function (next) {
  try {
    if (!this.isNew) {
      return next();
    }
/* 
    for (const product of this.products) {
      if(product.productcode){
        const foundProduct = await mongoose.model('Product').findOne({ _id: product.productcode });
        if (!foundProduct) {
          continue;
        }
        foundProduct.availableqty -= product.qty;
        await foundProduct.save();
      }else{
        continue;
      }
     
    } */


    const highestInvoiceno = await mongoose
      .model("Invoice")
      .findOne({branch: this.branch}, "invoiceno")
      .sort({ createdAt: -1 });
    let newInvoicenoCode;
    if (!highestInvoiceno) {
      newInvoicenoCode = "INV0001";
    } else {
      const lastCode = parseInt(highestInvoiceno.invoiceno.slice(3));
      newInvoicenoCode =
        "INV" +
        (lastCode + 1)
          .toString()
          .padStart(highestInvoiceno.invoiceno.slice(3).length, "0");
    }
    this.invoiceno = newInvoicenoCode;
    console.log( this.invoiceno)
    next();
  } catch (error) {
    console.log('error' ,error)
    next();
  }
});

export const InvoiceModel = mongoose.model("Invoice", InvoiceSchema);
