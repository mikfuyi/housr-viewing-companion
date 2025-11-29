import express from "express";
import dotenv from "dotenv";
import axios from "axios";

// Load .env
dotenv.config();

const app = express();
app.use(express.json());

const ELEVEN_API_KEY = process.env.ELEVENLABS_API_KEY;
const PORT = process.env.PORT || 5000;

if (!ELEVEN_API_KEY) {
    console.error("No ELEVEN_API_KEY found in .env");
    process.exit(1);
}

// --------------------------------------------
// Route: Generate audio from text
// --------------------------------------------

app.post("/api/audio", async (req, res) => {
    const { text, voice } = req.body;

    if (!text) {
        return res.status(400).json({ error: "Missing 'text' field." });
    }

    try {
        // ElevenLabs API URL (using the new v1 TTS endpoint)
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
            responseType: "arraybuffer" // important
        });

        const audioBuffer = Buffer.from(response.data);

        res.set({
            "Content-Type": "audio/mpeg",
            "Content-Length": audioBuffer.length
        });

        return res.send(audioBuffer);

    } catch (err) {
        console.error("Error generating audio:", err.response?.data || err.message);
        res.status(500).json({ error: "Failed to generate audio." });
    }
});

// --------------------------------------------
// Start server
// --------------------------------------------

app.listen(PORT, () => {
    console.log(`🚀 Backend running on http://localhost:${PORT}`);
});
