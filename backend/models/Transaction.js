const mongoose = require('mongoose');

const transactionSchema = new mongoose.Schema({
  pfNumber: { type: String, required: true }, // Link to employee's PF account
  date: { type: String, required: true },
  type: { type: String, required: true }, // Salary, Withdrawal, Bonus, etc.
  mode: { type: String, required: true }, // UPI, Cheque, Bank Transfer
  ref: { type: String, required: true },
  amount: { type: Number, required: true },
  isCredit: { type: Boolean, required: true }, // true for credit, false for debit
}, { timestamps: true });

module.exports = mongoose.model('Transaction', transactionSchema);
