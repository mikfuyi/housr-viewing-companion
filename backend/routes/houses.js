// backend/routes/houses.js
const express = require("express");
const { houses } = require("../data/houses");


const router = express.Router();


// GET /api/houses  → return all houses
router.get("/", (req, res) => {
  res.json(houses);
});


// GET /api/houses/:id  → return one house by id
router.get("/:id", (req, res) => {
  const { id } = req.params;
  const house = houses.find((h) => h.id === id);


  if (!house) {
    return res.status(404).json({ error: "House not found" });
  }


  res.json(house);
});


module.exports = router;
