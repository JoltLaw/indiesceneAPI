require("dotenv").config();
const mongoose = require("mongoose");
const connectDB = require("./config/dbConn");
const express = require("express");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const bycrpt = require("bcrypt");
const Account = require("./models/Account");
const Event = require("./models/Event");
const registerController = require("./controllers/registerController");
const getUser = require("./controllers/getUser");
const logIn = require("./controllers/LoginController");
const logOut = require("./controllers/logoutController");
const updateAccount = require("./controllers/updateAccount");
const { deleteAccount } = require("./controllers/deleteAccount");
const {
  updateEvent,
  deleteEvent,
} = require("./controllers/update&deleteEvent");
const checkIfAuth = require("./middleware/auth");
const {
  fetchEvent,
  fetchUserEvents,
  fetchEvents,
} = require("./controllers/eventRoutes");

// Connect to Mongo DB
connectDB();
const app = express(cookieParser());

// user routes

// Create user
app.post("/user", bodyParser.json(), registerController.newAccountHandler);

// Get user
app.get("/user", getUser);

// Update user account information
app.patch("/user", bodyParser.json(), checkIfAuth, updateAccount);

// Delete user account
app.delete("/user", bodyParser.json(), checkIfAuth, deleteAccount);

// Log user in
app.patch("/login", bodyParser.json(), logIn);

// Log user out
app.patch("/logout", bodyParser.json(), logOut);

// Get user events
app.get("/user/events", fetchUserEvents);

// Event routes

// Create event
app.post(
  "/event",
  bodyParser.json(),
  checkIfAuth,
  registerController.newEventHandler
);

// Update event
app.patch("/event", bodyParser.json(), checkIfAuth, updateEvent);

// Delete
app.delete("/event", bodyParser.json(), checkIfAuth, deleteEvent);

// Get single event
app.get("/event", fetchEvent);

// Get multiple events
app.get("/events", fetchEvents);

if (mongoose.connect) {
  app.listen(process.env.PORT, () => {
    console.log(`listening on port ${process.env.PORT}`);
  });
}
