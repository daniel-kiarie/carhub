const express = require("express");
const router = express.Router();
const { protect } = require("../middleware/authMiddleware");
const Favourite = require("../model/Favourite");


// GET /api/favourites — return all favourited cars for the logged-in user
router.get("/", protect, async (req, res) => {
  try {
    const favourites = await Favourite.find({ user: req.user.id }).populate("car");
    res.json(favourites.map((f) => f.car)); // return car objects, not wrapper docs
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
});

// POST /api/favourites/:carId — toggle favourite
router.post("/:carId", protect, async (req, res) => {
  
  try {
    const existing = await Favourite.findOne({ user: req.user.id, car: req.params.carId });

    if (existing) {
      await existing.deleteOne();
      return res.json({ isFavourite: false, carId: req.params.carId });
    }

    await Favourite.create({ user: req.user.id, car: req.params.carId });
    res.status(201).json({ isFavourite: true, carId: req.params.carId });
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
});

// DELETE /api/favourites/:carId — remove a car from favourites
router.delete("/:carId", protect, async (req, res) => {
  try {
    const result = await Favourite.findOneAndDelete({ user: req.user.id, car: req.params.carId });
    if (!result) return res.status(404).json({ message: "Favourite not found" });

    res.json({ message: "Car removed from favourites", carId: req.params.carId });
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
});

module.exports = router;