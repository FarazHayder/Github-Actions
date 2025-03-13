const express = require("express");
const {
  getCategories,
  getEventsByCategory,
  updateEventCategory,
} = require("../controllers/categoryController");
const authMiddleware = require("../middleware/authMiddleware");

const router = express.Router();

router.get("/", getCategories);
router.get("/:category", authMiddleware, getEventsByCategory);
router.patch("/:eventId", authMiddleware, updateEventCategory);

module.exports = router;
