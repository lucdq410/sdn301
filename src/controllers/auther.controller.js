const User = require("../models/users.model");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { generateToken } = require("../utils/generateToken");
const saltRounds = 10;

const register = async (req, res) => {
  try {
    const { name, email, password, confirmPassword } = req.body;
    const user = await User.findOne({
      email: email,
    });
    // Check if all required fields are provided
    if (!name || !email || !password || !confirmPassword) {
      return res.status(200).json({
        message: "All fields are required",
        data: null,
        isSuccess: false,
      });
    }
    if (user) {
      return res.status(200).json({
        message: "Email already exists",
        data: null,
        isSuccess: false,
      });
    }
    if (password !== confirmPassword) {
      return res.status(200).json({
        message: "Passwords do not match",
        data: null,
        isSuccess: false,
      });
    }
    // Hash the password
    const hashedPassword = await bcrypt.hash(password, saltRounds);

    // Create new user
    const newUser = new User({
      name: name,
      email: email,
      password: hashedPassword,
    });
    // Save the user to the database
    await newUser.save();

    // Respond with success
    res.status(200).json({
      message: "User registered successfully",
      data: newUser,
      isSuccess: true,
    });
  } catch (error) {
    // Handle any errors
    res.status(200).json({
      message: "Internal server error",
      data: null,
      isSuccess: false,
    });
  }
};

const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res.status(200).json({
        message: "Email and password are required",
        data: null,
        isSuccess: false,
      });
    }
    // Check if user exists
    const user = await User.findOne({ email: email });
    if (!user) {
      return res.status(200).json({
        message: "Invalid email or password",
        data: null,
        isSuccess: false,
      });
    }
    // Compare the password with the hashed password in the database
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(400).json({
        message: "Invalid email or password",
        data: null,
        isSuccess: false,
      });
    }
    const token = generateToken(user._id);
    // Respond with success and token
    res.status(200).json({
      message: "Login successful",
      data: { token: token, role: user.role },
      isSuccess: true,
    });
  } catch (error) {
    // Handle any errors
    res.status(200).json({
      message: "Internal server error",
      data: null,
      isSuccess: false,
    });
  }
};

module.exports = { register, login };
