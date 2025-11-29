// elevenlabs.js
const express = require("express");
const axios = require("axios");
const dotenv = require("dotenv");

dotenv.config();

const router = express.Router();
const ELEVEN_API_KEY = process.env.ELEVENLABS_API_KEY;
const DEFAULT_VOICE = process.env.ELEVENLABS_DEFAULT_VOICE; 

router.post("/", async (req, res) => {
    const { text, voice } = req.body;

    if (!text) {
        return res.status(400).json({ error: "Missing text field." });
    }

    const voiceId = voice || DEFAULT_VOICE;

    if (!voiceId) {
        return res.status(400).json({ error: "Missing voice ID." });
    }

    try {
        const url = `https://api.elevenlabs.io/v1/text-to-speech/${voiceId}`;

        const response = await axios({
            method: "POST",
            url,
            data: {
                text,
                model_id: "eleven_multilingual_v2"
            },
            headers: {
                "xi-api-key": ELEVEN_API_KEY,
                "Content-Type": "application/json",
                "Accept": "audio/mpeg"
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
