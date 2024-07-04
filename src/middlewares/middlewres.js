const jwt = require("jsonwebtoken");
const { userRole } = require("../enums");
const User = require("../models/users.model");
const { request } = require("../../app");

const middlewares = async (req, res, next) => {
  const authHeader = req.headers.authorization;
  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return res.status(200).json({
      message: "not find header",
      data: null,
      isSuccess: false,
    });
  }
  const token = authHeader.split(" ")[1];
  try {
    const decode = jwt.verify(token, process.env.JWTSECURITY);
    const user = await User.findById(decode.id);
    if (!user) {
      return res.status(200).json({
        message: "user does not exist ",
        data: null,
        isSuccess: false,
      });
    }
    req.user = user;
    next();
  } catch (error) {
    res.status(200).json({
      message: "Internal server error",
      data: null,
      isSuccess: false,
    });
  }
};

const isAdmin = async (req, res, next) => {
  if (req.user.role !== userRole.ADMIN) {
    return res.status(200).json({
      message: "user not admin",
      data: null,
      isSuccess: false,
    });
  }
  next();
};
module.exports = { middlewares, isAdmin };
