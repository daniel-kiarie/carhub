const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();

const app = express();

app.use(cors({
  origin: process.env.CLIENT_URL || "*",
  credentials: true,
}));
app.use(express.json());

app.use("/api/auth",      require("./routes/Auth"));
app.use("/api/cars",      require("./routes/Cars"));
app.use("/api/favourites", require("./routes/Favourites"));
app.use("/api/admin",     require("./routes/Admin"));

app.use((req, res) => {
  res.status(404).json({ message: `Route ${req.method} ${req.url} not found` });
});

app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(err.status || 500).json({ message: err.message || "Internal server error" });
});

const PORT = process.env.PORT || 5000;

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    console.log("MongoDB connected");
    app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
  })
  .catch((err) => console.error("DB connection failed:", err));

mongoose.connection.on("disconnected", () => {
  console.warn("MongoDB disconnected");
});


app.get("/", (req, res) => {
  res.send("Welcome to the Car Showcase API");
})