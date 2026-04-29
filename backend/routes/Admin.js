const express = require("express");
const router = express.Router();
const User = require("../model/User");
const Car = require("../model/carModel");
const { protect, adminOnly } = require("../middleware/authMiddleware");

// GET /api/admin/stats
router.get("/stats", protect, adminOnly, async (req, res) => {
  try {
    const totalUsers = await User.countDocuments();
    const totalCars = await Car.countDocuments();
    res.json({ totalUsers, totalCars });
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
});

// GET /api/admin/users
router.get("/users", protect, adminOnly, async (req, res) => {
  try {
    const users = await User.find().select("-password");
    res.json(users);
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
});

// DELETE /api/admin/users/:id
router.delete("/users/:id", protect, adminOnly, async (req, res) => {
  try {
    const user = await User.findByIdAndDelete(req.params.id);
    if (!user) return res.status(404).json({ message: "User not found" });
    res.json({ message: "User deleted" });
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
});

module.exports = router;