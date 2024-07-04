const mongoose = require("mongoose");
const { userRole } = require("../enums");

const userSchema = new mongoose.Schema(
  {
    email: {
      type: String,
      require: true,
      unique: true,
    },
    phone: {
      type: String,
      require: true,
    },
    password: {
      type: String,
      require: true,
    },
    role: {
      type: String,
      enum: Object.values(userRole),
      default: userRole.USER,
    },
  },
  {
    timestamps: true,
  }
);
const User = mongoose.model("USER", userSchema);
module.exports = User;
