const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const Employee = require('./models/Employee');
require('dotenv').config();

const seed = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI);
        console.log("Connected to MongoDB");

        const hashedPassword = await bcrypt.hash("123456", 10);

        const employee = new Employee({
            pfNumber: "PF001",
            password: hashedPassword,
            name: "Ashok Vaishnav",
            dob: "1999-10-25",
            gender: "Male",
            position: "Software Developer",
            aadhar: "1234-5678-9012",
            pfBalance: 56000,
            photo: "https://thumbs.dreamstime.com/b/cute-panda-cartoon-306685678.jpg"  // Placeholder image
        });

        await employee.save();
        console.log("Dummy employee created successfully.");
        mongoose.disconnect();
    } catch (err) {
        console.error(err);
        mongoose.disconnect();
    }
};

seed();
