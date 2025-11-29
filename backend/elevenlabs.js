// elevenlabs.js (CommonJS version)

const express = require("express");
const axios = require("axios");
const dotenv = require("dotenv");

dotenv.config();

const router = express.Router();
const ELEVEN_API_KEY = process.env.ELEVENLABS_API_KEY;

router.post("/", async (req, res) => {
    const { text, voice } = req.body;

    if (!text) {
        return res.status(400).json({ error: "Missing text field." });
    }

    try {
        const url = `https://api.elevenlabs.io/v1/text-to-speech/${voice || "Rachel"}`;

        const response = await axios({
            method: "POST",
            url,
            data: {
                text,
                model_id: "eleven_monolingual_v1"
            },
            headers: {
                "xi-api-key": ELEVEN_API_KEY,
                "Content-Type": "application/json"
            },
            responseType: "arraybuffer"
        });

        const audio = Buffer.from(response.data);

        res.set({
            "Content-Type": "audio/mpeg",
            "Content-Length": audio.length
        });

        res.send(audio);
    } catch (error) {
        console.error("ElevenLabs error:", error.response?.data || error.message);
        res.status(500).json({ error: "Failed to generate audio." });
    }
});

module.exports = router;
