const Account = require("../models/Account");

const checkIfAuth = async (req, res, next) => {
  const account = await Account.findOne({ refreshToken: req.body.token });

  if (!account) {
    return res.status(400).json({ message: "Unable to authenticate account" });
  } else {
    next();
  }
};

module.exports = checkIfAuth;
