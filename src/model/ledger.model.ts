import mongoose from "mongoose";
const LedgerSchema = new mongoose.Schema({
  branch: {
    type: mongoose.Types.ObjectId,
    ref: "Branch",
    required: true,
  },
  category: {
    type: String,
    required: true,
  },
  txnNo: {
    type: String,
    // required: true,
  },
  refNo: {
    type: String,
  },
  txnDate: {
    type: Date,
    default: Date.now,
  },
  description: String,
  type: String,
  amount: {
    type: Number,
    required: true,
    default: 0,
    min: 0
  },
  branchBalance: {
    type: Number,
    required: true,
  },
  createdBy: String,
  updatedBy: String,
  createdAt: {
    type: Date,
    default: Date.now,
  },
  /* updatedAt: Date, */
});
LedgerSchema.pre("save", async function (next) {
  try {
    if (!this.isNew) {
      return next();
    }

    const lastLedgerEntry = await mongoose
      .model("Ledger")
      .findOne({ branch: this.branch })
      .sort({ createdAt: -1 });
    const oldBranchBalance = lastLedgerEntry
      ? lastLedgerEntry.branchBalance
      : 0;
    this.branchBalance =
      this.type === "Credit"
        ? oldBranchBalance + this.amount
        : oldBranchBalance - this.amount;
    this.branchBalance = Math.round(this.branchBalance * 100) / 100
    const highestTxnno = await mongoose
      .model("Ledger")
      .findOne({branch: this.branch}, "txnNo")
      .sort({ createdAt: -1 });
    const lastCode = highestTxnno ? parseInt(highestTxnno.txnNo.slice(3)) : 0;
    const newTxnNo = `TXN${(lastCode + 1).toString().padStart(4, "0")}`;
    this.txnNo = newTxnNo;

    next();
  } catch (error) {
    next();
  }
});

export const LedgerModel = mongoose.model("Ledger", LedgerSchema);
