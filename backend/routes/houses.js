// backend/routes/houses.js
const express = require("express");
const {
  houses,
  addHouseFromDescription,
  findHouseById,
  findHouseByCode,
} = require("../data/houses");
const { generateNarrationText } = require("../services/ai");

const router = express.Router();

// ========== LANDLORD: CREATE HOUSE ==========
// POST /api/houses  → landlord sends property description.
// Backend generates id + 6-digit code and stores it.
router.post("/", (req, res) => {
  const { description } = req.body;

  if (!description || typeof description !== "string") {
    return res
      .status(400)
      .json({ error: "Missing 'description' in request body." });
  }

  const newHouse = addHouseFromDescription(description);
  res.status(201).json({
    id: newHouse.id,
    code: newHouse.code,
    house: newHouse,
  });
});

// ========== CLIENT: FIND BY CODE ==========
/*
  GET /api/houses/code/:code
  Example: /api/houses/code/583920
*/
router.get("/code/:code", (req, res) => {
  const { code } = req.params;
  const house = findHouseByCode(code);

  if (!house) {
    return res.status(404).json({ error: "House not found for that code." });
  }

  res.json(house);
});

// ========== AI: GENERATE NARRATION FOR A CODE ==========
/*
  POST /api/houses/code/:code/narration
  body: { viewerType?: "student", section?: "intro" }

  Returns: { text: "..." }
*/
router.post("/code/:code/narration", async (req, res) => {
  const { code } = req.params;
  const { viewerType = "student", section = "full tour" } = req.body || {};

  const house = findHouseByCode(code);

  if (!house) {
    return res.status(404).json({ error: "House not found for that code." });
  }

  try {
    const text = await generateNarrationText(house, viewerType, section);
    res.json({ text });
  } catch (err) {
    console.error("Narration error:", err);
    res.status(500).json({ error: "Failed to generate narration" });
  }
});

// ========== EXISTING ROUTES (by ID) ==========

// GET /api/houses  → return all houses
router.get("/", (req, res) => {
  res.json(houses);
});

// IMPORTANT: this must come after the /code/... routes
// GET /api/houses/:id  → return one house by id
router.get("/:id", (req, res) => {
  const { id } = req.params;
  const house = findHouseById(id);

  if (!house) {
    return res.status(404).json({ error: "House not found" });
  }

  res.json(house);
});

module.exports = router;



module.exports = router;
