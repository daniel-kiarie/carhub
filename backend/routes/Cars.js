const express = require("express");
const router = express.Router();
const Car = require("../model/carModel");
const { protect, adminOnly } = require("../middleware/authMiddleware");

console.log("Protect:", protect);

console.log("AdminOnly:", adminOnly);

// @route   GET /api/cars/featured
// @access  Public
router.get("/featured", async (req, res) => {
  try {
    const cars = await Car.find({ Featured: true });
    res.json(cars);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// @route   GET /api/cars/search?q=
// @access  Public
router.get("/search", async (req, res) => {
  try {
    const { q } = req.query;
    const cars = await Car.find({
      $or: [
        { title: { $regex: q, $options: "i" } },
        { brand: { $regex: q, $options: "i" } },
        { model: { $regex: q, $options: "i" } },
      ],
    });
    res.json(cars);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// @route   GET /api/cars/filter?price=&year=&fuel=&transmission=
// @access  Public
router.get("/filter", async (req, res) => {
  try {
    const { minPrice, maxPrice, year, fuel, transmission } = req.query;
    const query = {};
    if (fuel)         query.fuelType     = fuel;
    if (transmission) query.transmission = transmission;
    if (year)         query.year         = Number(year);
    if (minPrice || maxPrice) {
      query.price = {};
      if (minPrice) query.price.$gte = Number(minPrice);
      if (maxPrice) query.price.$lte = Number(maxPrice);
    }
    const cars = await Car.find(query);
    res.json(cars);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// @route   GET /api/cars/paginate?page=1
// @access  Public
router.get("/paginate", async (req, res) => {
  try {
    const page  = Number(req.query.page)  || 1;
    const limit = Number(req.query.limit) || 6;
    const skip  = (page - 1) * limit;
    const total = await Car.countDocuments();
    const cars  = await Car.find().skip(skip).limit(limit);
    res.json({ cars, total, page, pages: Math.ceil(total / limit) });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// @route   GET /api/cars/brand/:brand
// @access  Public
router.get("/brand/:brand", async (req, res) => {
  try {
    const cars = await Car.find({
      brand: { $regex: req.params.brand, $options: "i" },
    });
    res.json(cars);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// ─── Core CRUD Routes ─────────────────────────────────────────────────────────

// @route   GET /api/cars
// @access  Public
router.get("/", async (req, res) => {
  try {
    const cars = await Car.find();
    res.json(cars);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// @route   GET /api/cars/:id
// @access  Public
router.get("/:id", async (req, res) => {
  try {
    const car = await Car.findById(req.params.id);
    if (!car) return res.status(404).json({ message: "Car not found" });
    res.json(car);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// @route   POST /api/cars
// @access  Private - Admin only
router.post("/", protect, adminOnly, async (req, res) => {
  try {
    const car = await Car.create({ ...req.body, createdBy: req.user._id });
    res.status(201).json(car);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// @route   PUT /api/cars/:id
// @access  Private - Admin only
router.put("/:id", protect, adminOnly, async (req, res) => {
  try {
    const car = await Car.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!car) return res.status(404).json({ message: "Car not found" });
    res.json(car);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// @route   DELETE /api/cars/:id
// @access  Private - Admin only
router.delete("/:id", protect, adminOnly, async (req, res) => {
  try {
    const car = await Car.findByIdAndDelete(req.params.id);
    if (!car) return res.status(404).json({ message: "Car not found" });
    res.json({ message: "Car deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;