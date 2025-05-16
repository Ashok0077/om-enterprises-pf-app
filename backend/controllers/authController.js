const Employee = require('../models/Employee');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

exports.login = async (req, res) => {
    const { pfNumber, password } = req.body;
    try {
        const employee = await Employee.findOne({ pfNumber });
        if (!employee) return res.status(404).json({ message: "No user found" });

        const isMatch = await bcrypt.compare(password, employee.password);
        if (!isMatch) return res.status(400).json({ message: "Invalid credentials" });

        const token = jwt.sign({ id: employee._id }, process.env.JWT_SECRET, { expiresIn: '1d' });
        res.json({ token, employee });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};
