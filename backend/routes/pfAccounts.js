const express = require('express');
const multer = require('multer');
const router = express.Router();
const Employee = require('../models/Employee');
const Transaction = require('../models/Transaction');

// Multer configuration using memoryStorage for storing files in memory
const storage = multer.memoryStorage();

const upload = multer({
  storage,
  fileFilter: (req, file, cb) => {
    if (file.mimetype.startsWith('image/')) {
      cb(null, true);
    } else {
      cb(new Error('Only image files are allowed'), false);
    }
  }
});

// GET all PF accounts
router.get('/', async (req, res) => {
  try {
    const accounts = await Employee.find();
    res.status(200).json({ success: true, accounts });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Failed to fetch PF accounts', error: error.message });
  }
});

// POST create new PF account with image upload (stored as base64 in MongoDB)
router.post('/', upload.fields([
  { name: 'photo', maxCount: 1 },
  { name: 'aadharImage', maxCount: 1 }
]), async (req, res) => {
  try {
    const {
      name, dob, aadhar, gender, position,
      pfBalance, password, phone, pfNumber
    } = req.body;

    const photoBuffer = req.files['photo']?.[0]?.buffer;
    const aadharBuffer = req.files['aadharImage']?.[0]?.buffer;

    const photoBase64 = photoBuffer ? photoBuffer.toString('base64') : '';
    const aadharBase64 = aadharBuffer ? aadharBuffer.toString('base64') : '';

    const newAccount = new Employee({
      name,
      dob,
      aadhar,
      gender,
      position,
      pfBalance,
      password,
      phone,
      pfNumber,
      photo: photoBase64,
      aadharCardImage: aadharBase64
    });

    await newAccount.save();
    res.status(201).json({ success: true, message: 'PF account created', account: newAccount });
  } catch (error) {
    console.error('Error saving employee:', error);
    res.status(400).json({ success: false, message: 'Failed to create PF account', error: error.message });
  }
});

// DELETE PF account and its transactions
router.delete('/:pfNumber', async (req, res) => {
  try {
    const deleted = await Employee.findOneAndDelete({ pfNumber: req.params.pfNumber });
    if (!deleted) {
      return res.status(404).json({ success: false, message: 'PF account not found' });
    }

    await Transaction.deleteMany({ pfNumber: req.params.pfNumber });

    res.status(200).json({
      success: true,
      message: 'PF account and related transactions deleted',
      deleted
    });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Failed to delete PF account', error: error.message });
  }
});

module.exports = router;
