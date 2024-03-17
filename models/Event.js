const mongoose = require("mongoose");
const { Schema } = mongoose;

const eventSchema = new Schema({
  account: { type: String, required: true },
  name: { type: String, required: true },
  dis: { type: String, required: true },
  location: { type: String, required: true },
  date: { type: Date, required: true },
  imgs: Array,
  contactInfo: Array,
});

module.exports = mongoose.model("Event", eventSchema);
