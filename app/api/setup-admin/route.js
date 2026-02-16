const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
require("dotenv").config();

// Import your User model
const User = require("../models/User");

async function seedAdmin() {
  try {
    await mongoose.connect(process.env.MONGODB_URI);

    const existing = await User.findOne({
      email: "preciousikelegbe@gmail.com",
    });

    if (existing) {
      console.log("Admin already exists.");
      process.exit();
    }

    const hashedPassword = await bcrypt.hash("123456", 10);

    const admin = new User({
      email: "preciousikelegbe@gmail.com",
      password: hashedPassword,
      role: "admin",
    });

    await admin.save();

    console.log("Admin user created successfully!");
    process.exit();
  } catch (err) {
    console.error(err);
    process.exit(1);
  }
}

seedAdmin();