import mongoose from "mongoose";

const creditCardBillSchema = new mongoose.Schema({
  user_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  account_id: { // Refers to the credit card Account
    type: mongoose.Schema.Types.ObjectId,
    ref: "Account",
    required: true,
  },
  due_date: {
    type: Date,
    required: true,
  },
  closing_date: {
    type: Date,
    required: true,
  },
  amount: {
    type: Number,
    required: true,
  },
  paid_amount: {
    type: Number,
    default: 0,
  },
  status: { // e.g., 'open', 'closed', 'paid', 'partially_paid', 'overdue'
    type: String,
    required: true,
    default: 'open',
    enum: ['open', 'closed', 'paid', 'partially_paid', 'overdue'],
  },
  // Array of transactions included in this bill
  transactions: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Transaction',
  }],
  notes: {
    type: String,
    default: "",
  },
}, { timestamps: true });

// Static methods to mimic base44.entities.CreditCardBill behavior
creditCardBillSchema.statics.list = async function (userId, accountId = null) {
  const query = { user_id: userId };
  if (accountId) {
    query.account_id = accountId;
  }
  return this.find(query).populate('account_id').populate('transactions');
};

creditCardBillSchema.statics.create = async function (data) {
  const bill = new this(data);
  return bill.save();
};

creditCardBillSchema.statics.update = async function (billId, data) {
  return this.findByIdAndUpdate(billId, data, { new: true });
};

creditCardBillSchema.statics.delete = async function (billId) {
  return this.findByIdAndDelete(billId);
};

// Method to add a transaction to a bill (example)
creditCardBillSchema.methods.addTransaction = async function (transactionId) {
  if (!this.transactions.includes(transactionId)) {
    this.transactions.push(transactionId);
    // Recalculate bill amount or other logic might be needed here
    return this.save();
  }
  return this;
};

const CreditCardBill = mongoose.model("CreditCardBill", creditCardBillSchema);

export default CreditCardBill;
