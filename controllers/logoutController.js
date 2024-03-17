const Account = require("../models/Account");

const logOut = async (req, res) => {
  const token = req.body.token;
  await Account.findOneAndUpdate({ refreshToken: token }, { refreshToken: "" });
  res
    .status(200)
    .clearCookie("IndieSceneLogIn")
    .json({ message: "User logged out" });
};

module.exports = logOut;
