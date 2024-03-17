const bycrpt = require("bcrypt");
const Account = require("../models/Account");
const Event = require("../models/Event");

const logIn = require("./LoginController");

// Function for creating a new account
const newAccountHandler = async (req, res) => {
  const { userName, email, phone, password } = req.body;

  if (!userName || !email || !password) {
    return res
      .status(400)
      .json({ message: "Username, Email, and Password are required" });
  }

  try {
    // Hash password
    const hashedPass = await bycrpt.hash(password, 10);

    // Create and store new user
    const result = await Account.create({
      displayName: userName,
      email: email,
      phone: phone,
      password: hashedPass,
    });

    logIn(req, res);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Function for creating a new Event
const newEventHandler = async (req, res) => {
  const { token, name, dis, location, date, imgs, contactInfo } = req.body;
  if (!token || !name || !dis || !location || !date) {
    // Response assumes user has there account ID defined if they make it this far into creating an even
    return res.status(400).json({
      message:
        "Event name, discription, location, and date/time are all required",
    });
  }

  const account = await Account.findOne({ refreshToken: req.body.token });
  const dateObject = new Date(date);

  try {
    const result = await Event.create({
      account: account._id,
      name: name,
      dis: dis,
      location: location,
      date: dateObject,
      imgs: imgs,
      contactInfo: contactInfo,
    });

    console.log(result);

    res.status(201).json({ success: `New event created!` });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

module.exports = { newAccountHandler, newEventHandler };
