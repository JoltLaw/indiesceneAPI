const jwt = require("jsonwebtoken");
const bycrpt = require("bcrypt");
const Account = require("../models/Account");

const logIn = async (req, res) => {
  const { email, password } = req.body;

  const account = await Account.findOne({ email: email });

  let passwordMatches = await bycrpt.compare(password, account.password);

  delete account.password;

  const displayName = account.displayName;

  if (passwordMatches == true) {
    const token = jwt.sign({ displayName }, process.env.MY_SECRET, {
      expiresIn: "168h",
    });

    // account.refreshToken = token;

    await Account.findOneAndUpdate(
      { displayName: displayName },
      { refreshToken: token }
    );

    res.cookie("IndieSceneLogIn", token);

    res.status(200).json({ message: "User signed in" });
  } else {
    return res.status(400).json({ message: "Email or password incorrect" });
  }
};

module.exports = logIn;
