const Event = require("../models/Event");

const categories = ["Meeting", "Birthday", "Appointment", "Personal", "Work"];

exports.getCategories = (req, res) => {
  res.json({ categories });
};

exports.getEventsByCategory = async (req, res) => {
  try {
    const { category } = req.params;
    if (!categories.includes(category)) {
      return res.status(400).json({ error: "Invalid category" });
    }

    const events = await Event.find({ user: req.user.id, category }).sort("date");
    res.json(events);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.updateEventCategory = async (req, res) => {
  try {
    const { eventId } = req.params;
    const { category } = req.body;

    if (!categories.includes(category)) {
      return res.status(400).json({ error: "Invalid category" });
    }

    const event = await Event.findOneAndUpdate(
      { _id: eventId, user: req.user.id },
      { category },
      { new: true }
    );

    if (!event) return res.status(404).json({ error: "Event not found" });

    res.json({ message: "Category updated successfully", event });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
