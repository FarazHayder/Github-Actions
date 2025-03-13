const mongoose = require("mongoose");

const categories = ["Meeting", "Birthday", "Appointment", "Personal", "Work"];

const EventSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  name: String,
  description: String,
  date: Date,
  category: { type: String, enum: categories, required: true },
  reminder: Date,
});

module.exports = mongoose.model("Event", EventSchema);
