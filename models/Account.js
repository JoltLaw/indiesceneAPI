const mongoose = require("mongoose");
const { Schema } = mongoose;

const accountSchema = new Schema({
  displayName: { type: String, unique: true, required: true },
  email: { type: String, unique: true, required: true },
  phone: String,
  password: { type: String, required: true },
  refreshToken: String,
});

module.exports = mongoose.model("Account", accountSchema);
