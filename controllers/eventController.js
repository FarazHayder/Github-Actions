const Event = require("../models/Event");

exports.createEvent = async (req, res) => {
  try {
    const { name, description, date, category, reminder } = req.body;

    if (!name || !date || !category) {
      return res.status(400).json({ error: "Name, date, and category are required" });
    }

    const newEvent = new Event({
      user: req.user.id,
      name,
      description,
      date,
      category,
      reminder,
    });

    await newEvent.save();
    res.status(201).json({ message: "Event created successfully", event: newEvent });

  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.getEvents = async (req, res) => {
  try {
    const events = await Event.find({ user: req.user.id }).sort("date");
    res.json(events);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
