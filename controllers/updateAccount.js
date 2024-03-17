const Account = require("../models/Account");

const updateAccount = async (req, res) => {
  const { token, updatedUser } = req.body;
  try {
    const user = await Account.findOneAndUpdate(
      { refreshToken: token },
      updatedUser
    );
    res.status(200).json({ message: "Account updated" });
  } catch (err) {
    res.status(400).send({ message: err.message });
  }
};

module.exports = updateAccount;
