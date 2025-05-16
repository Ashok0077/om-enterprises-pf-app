const express = require('express');
const router = express.Router();
const Transaction = require('../models/Transaction');
const Employee = require('../models/Employee');

// ➕ Create Transaction & Update Employee PF Balance
router.post('/', async (req, res) => {
  try {
    const txn = new Transaction(req.body);
    await txn.save();

    const { pfNumber, amount, isCredit } = req.body;
    const employee = await Employee.findOne({ pfNumber });

    if (!employee) return res.status(404).json({ error: 'Employee not found' });

    employee.pfBalance += isCredit ? Number(amount) : -Number(amount);
    await employee.save();

    res.status(201).json({ transaction: txn, updatedPfBalance: employee.pfBalance });
  } catch (err) {
    console.error(err);
    res.status(400).json({ error: err.message });
  }
});

// 📥 Get All Transactions by PF Number
router.get('/:pfNumber', async (req, res) => {
  try {
    const transactions = await Transaction.find({ pfNumber: req.params.pfNumber }).sort({ date: -1 });
    res.json({ transactions });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.delete('/ref/:ref', async (req, res) => {
  try {
    const txn = await Transaction.findOne({ ref: req.params.ref });
    if (!txn) return res.status(404).json({ error: 'Transaction not found' });

    const employee = await Employee.findOne({ pfNumber: txn.pfNumber });
    if (!employee) return res.status(404).json({ error: 'Employee not found' });

    // Revert transaction effect
    employee.pfBalance += txn.isCredit ? -txn.amount : txn.amount;

    await txn.deleteOne();
    await employee.save();

    res.json({ message: 'Transaction deleted successfully', updatedPfBalance: employee.pfBalance });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
