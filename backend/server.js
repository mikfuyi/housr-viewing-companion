const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

const elevenlabsRouter = require("./elevenlabs");
app.use("/api/audio", elevenlabsRouter);

app.get("/health", (req, res) => {
  res.json({ status: "ok", time: new Date().toISOString() });
});



const PORT = process.env.PORT || 4000;
app.listen(PORT, () => console.log(`Backend running on port ${PORT}`));
