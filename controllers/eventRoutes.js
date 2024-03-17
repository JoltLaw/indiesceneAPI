const Event = require("../models/Event");
const returnLimit = 10;

// Fetch event by id;
const fetchEvent = async (req, res) => {
  const id = req.query._id;

  try {
    const event = await Event.findOne({ _id: id });
    res.status(200).json(JSON.stringify(event));
  } catch (err) {
    res.status(400).json({ message: err });
  }
};

// Fetch events only related to user
const fetchUserEvents = async (req, res) => {
  const user = req.query.id;

  try {
    const events = await Event.find({ account: user });
    res.status(200).json(JSON.stringify(events));
  } catch (err) {
    res.status(400).json({ message: err });
  }
};

const fetchEvents = async (req, res) => {
  const { _id, eventName, eventLocation, offSet } = req.query;
  const offSetValue = offSet ? offSet : 0;
  let event;
  if (_id) {
    try {
      event = await Event.findById(_id);
      res.status(200).json(JSON.stringify(event));
    } catch (err) {
      res.status(400).json({ message: err });
    }
  }

  // If name and location are both defined use both values to find pool of events
  else if (eventName && eventLocation) {
    try {
      event = await Event.find({
        name: eventName,
        location: eventLocation,
        date: { $gte: Date.now() },
      })
        .skip(offSetValue)
        .limit(returnLimit);
      res.status(200).json(JSON.stringify(event));
    } catch (err) {
      res.status(400).json({ message: err });
    }
  }
  // If just the location value is defined
  else if (eventLocation) {
    try {
      event = await Event.find({
        location: eventLocation,
        date: { $gte: Date.now() },
      })
        .skip(offSet)
        .limit(returnLimit);
      res.status(200).json(JSON.stringify(event));
    } catch (err) {
      res.status(400).json({ message: err.message });
    }
  }
  // If just the name value was defined
  else if (eventName) {
    try {
      event = await Event.find({
        name: eventName,
        date: { $gte: Date.now() },
      })
        .skip(offSet)
        .limit(returnLimit);
      res.status(200).json(JSON.stringify(event));
    } catch (err) {
      res.status(400).json({ message: err.message });
    }
  }
  // If no values specified
  else {
    try {
      event = await Event.find({ date: { $gte: Date.now() } })
        .skip(offSetValue)
        .limit(returnLimit);
      res.status(200).json(JSON.stringify(event));
    } catch (err) {
      res.status(400).json({ message: err });
    }
  }
};

module.exports = { fetchEvent, fetchUserEvents, fetchEvents };
