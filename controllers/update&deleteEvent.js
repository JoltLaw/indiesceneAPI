const Account = require("../models/Account");
const Event = require("../models/Event");

// Let users update event
const updateEvent = async (req, res) => {
  const { token, eventId, update } = req.body;
  try {
    const user = await Account.findOne({ refreshToken: token });
    const event = await Event.findOne({ _id: eventId });
    if (user._id == event.account) {
      const updatedEvent = await Event.findOneAndUpdate(
        { _id: eventId },
        update
      );
      res.status(200).json(JSON.stringify(updatedEvent));
    } else {
      res
        .status(400)
        .json({ message: "Event does not belong to this account" });
    }
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

// Let users delete Event
const deleteEvent = async (req, res) => {
  const { token, eventId } = req.body;
  try {
    const user = await Account.findOne({ refreshToken: token });
    const event = await Event.findOne({ _id: eventId });
    if (user._id == event.account) {
      await Event.findOneAndDelete({ _id: eventId });
      res.status(200).json({ message: "Event has been deleted" });
    } else {
      res
        .status(400)
        .json({ message: "Event does not belong to this account" });
    }
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

module.exports = { updateEvent, deleteEvent };
