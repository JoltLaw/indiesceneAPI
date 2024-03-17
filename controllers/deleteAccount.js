const Account = require("../models/Account");
const Event = require("../models/Event");

const deleteAccount = async (req, res) => {
  const { token } = req.body;
  try {
    const account = await Account.findOne({ refreshToken: token });
    await Event.deleteMany({ account: account._id });
    await Account.findOneAndDelete(account);
    res.status(200).json({ message: "Account has been deleted" });
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

module.exports = { deleteAccount };
