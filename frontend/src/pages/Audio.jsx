// src/pages/Audio.jsx
import { useEffect, useState, useRef } from "react";
import "./Audio.css";

export default function Audio() {
  const [houses, setHouses] = useState([]);
  const [selectedId, setSelectedId] = useState("");
  const [isLoadingHouses, setIsLoadingHouses] = useState(false);
  const [isGeneratingAudio, setIsGeneratingAudio] = useState(false);
  const [error, setError] = useState("");
  const [audioUrl, setAudioUrl] = useState("");

  const audioRef = useRef(null);

  // Load houses on mount – mirrors loadHouses() in test.html
  useEffect(() => {
    const loadHouses = async () => {
      try {
        setIsLoadingHouses(true);
        setError("");

        const res = await fetch("http://localhost:4000/api/houses");
        if (!res.ok) {
          throw new Error("Failed to load houses");
        }

        const data = await res.json();
        setHouses(data || []);
        if (data && data.length > 0) {
          setSelectedId(String(data[0].id));
        }
      } catch (err) {
        console.error(err);
        setError("Could not load houses. Please try again.");
      } finally {
        setIsLoadingHouses(false);
      }
    };

    loadHouses();
  }, []);

  const handlePlayClick = async () => {
    if (!selectedId) {
      setError("Select a house first.");
      return;
    }

    try {
      setIsGeneratingAudio(true);
      setError("");

      // Fetch selected house details
      const houseRes = await fetch(
        `http://localhost:4000/api/houses/${selectedId}`
      );
      if (!houseRes.ok) {
        throw new Error("Failed to load house details");
      }

      const house = await houseRes.json();

      const narration = `
You are viewing ${house.title} at ${house.address}.
Average bills: £${house.avgBills}.
Landlord rating: ${house.landlordRating}.
Pros: ${house.areaPros}.
Cons: ${house.areaCons}.
      `;

      // Request audio generation (same as test.html)
      const audioRes = await fetch("http://localhost:4000/api/audio", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          text: narration,
          voice: "21m00Tcm4TlvDq8ikWAM",
        }),
      });

      if (!audioRes.ok) {
        throw new Error("Failed to generate audio");
      }

      const audioData = await audioRes.arrayBuffer();
      const blob = new Blob([audioData], { type: "audio/mpeg" });

      const url = URL.createObjectURL(blob);
      // Clean up previous URL if any
      if (audioUrl) {
        URL.revokeObjectURL(audioUrl);
      }
      setAudioUrl(url);

      // Auto-play
      if (audioRef.current) {
        audioRef.current.load();
        audioRef.current.play().catch((err) => {
          console.warn("Autoplay failed:", err);
        });
      }
    } catch (err) {
      console.error(err);
      setError(err.message || "Something went wrong generating audio.");
    } finally {
      setIsGeneratingAudio(false);
    }
  };

return (
  <div className="audio-body">
    <div className="audio-shell">
      <div className="audio-window">

        {/* Titlebar */}
        <div className="audio-titlebar">
          <div className="dot red"></div>
          <div className="dot yellow"></div>
          <div className="dot green"></div>
          <p>Audio Viewer</p>
        </div>

        {/* Inner content */}
        <div className="audio-inner">

          <h1>Housr Viewing Companion</h1>
          <p className="audio-subtitle">
            Listen to your generated audio tour.
          </p>

          {/* --- Your ORIGINAL CONTENT goes here --- */}

          <div className="audio-controls">
            <label htmlFor="houseId">Select house:</label>
            <select
              id="houseId"
              value={selectedId}
              onChange={(e) => setSelectedId(e.target.value)}
              disabled={isLoadingHouses || houses.length === 0}
            >
              {houses.length === 0 && (
                <option value="">No houses available</option>
              )}
              {houses.map((h) => (
                <option key={h.id} value={h.id}>
                  {h.title}
                </option>
              ))}
            </select>

            <button
              id="playBtn"
              onClick={handlePlayClick}
              disabled={
                !selectedId ||
                isGeneratingAudio ||
                isLoadingHouses ||
                !houses.length
              }
            >
              {isGeneratingAudio ? "Generating..." : "Play Narration"}
            </button>
          </div>

          {error && <p className="audio-error">{error}</p>}

          <audio
            id="audioPlayer"
            ref={audioRef}
            controls
            style={{ marginTop: "1rem", width: "100%" }}
          >
            {audioUrl && <source src={audioUrl} type="audio/mpeg" />}
            Your browser does not support the audio element.
          </audio>

        </div>
      </div>
    </div>
  </div>
);
}
