const jwt = require("jsonwebtoken");

const generateToken = (id) => {
  return jwt.sign(
    {
      id,
    },
    process.env.JWTSECURITY,
    {
      expiresIn: "1d",
    }
  );
};
module.exports = { generateToken };
