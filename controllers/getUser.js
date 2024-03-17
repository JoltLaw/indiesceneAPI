const Account = require("../models/Account");
const Event = require("../models/Event");

const getUser = async (req, res) => {
  id = req.query._id;

  try {
    user = await Account.findOne({ _id: id });
    delete user.password;
    delete user.refreshToken;
    const retUser = {
      _id: user._id,
      displayName: user.displayName,
      email: user.email,
      phone: user.phone,
    };
    res.status(200).json(JSON.stringify(retUser));
  } catch (err) {
    res.status(400).json(err);
  }
};

module.exports = getUser;
