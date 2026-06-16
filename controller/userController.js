const User = require("../models/user");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const nodemailer = require("../middleware/nodemailer");
const sendEmail = require("../middleware/nodemailer");

exports.createUser = async (req, res) => {
  try {
    const { name, email, password, role, phonenumber } = req.body;
    if (!name || !email || !password || !phonenumber) {
      return res.status(400).json({ message: "All field are required" });
    }
    // existing email and phone number
    const existingEmail = await User.findOne({ email });
    if (existingEmail) {
      return res
        .status(400)
        .json({ message: "user with same email already exist" });
    }
    const existingPhone = await User.findOne({ phonenumber });
    if (existingPhone) {
      return res
        .status(400)
        .json({ message: "user with same phone number already exist" });
    }

    const hashed = await bcrypt.hash(password, 10);
    console.log(hashed);

    const newUser = await User.create({
      name,
      email,
      password: hashed,
      phonenumber,
      role,
    });
    sendEmail({
      to: email,
      subject: "New Staff Created",
      text: `dear ma/sir
    ${name} you are welcome to our establishment ,we looking forward to your impact and growth with us `,
    });

    return res.status(201).json({
      success: true,
      message: "created successfully",
      data: { name, email, phonenumber, role },
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

exports.userLogin = async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });
  if (!user) {
    res.status(400).json({ message: "invalid credentials" });
  }

  try {
    const match = await bcrypt.compare(password, user.password);
    if (!match) {
      res.status(400).json({ message: "invalid credentials" });
    }
    // token generation

    token = jwt.sign(
      {
        id: user._id,
        role: user.role,
      },
      process.env.JWT_SECRET,
      { expiresIn: process.env.JWT_EXPIRES_IN },
    );

    res.status(200).json({
      message: "Login sucessful",
      token,
      user: {
        id: user._id,
        name: user.name,
        role: user.role,
      },
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.getUsers = async (req, res) => {
  try {
    const users = await User.find();

    res.status(200).json({
      count: users.length,
      data: users,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.getUserById = async (req, res) => {
  try {
    const id = req.params.id;

    const user = await User.findById(id);
    if (!user) {
      res.status(400).json({ message: "user not found" });
    }

    if (user) {
      res.status(201).json(user);
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.deleteUser = async (req, res) => {
  try {
    const id = req.params.id;

    const user = await User.findByIdAndDelete(id);
    if (!user) {
      res.status(400).json({ message: "user not found" });
    }
    if (user) {
      res.status(200).json({ message: "user deleted successfully" });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.updateUser = async (req, res) => {
  try {
    const id = req.params.id;
    const updatedUser = await User.findByIdAndUpdate(id, req.body, {
      new: true,
      runValidators: true,
    });
    if (!updatedUser) {
      res.status(400).json({ message: "user not found" });
    }
    if (updatedUser) {
      res
        .status(200)
        .json({ message: "user updated successfully", updatedUser });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
