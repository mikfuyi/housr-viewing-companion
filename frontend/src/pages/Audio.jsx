// src/pages/Audio.jsx
import { useEffect, useState, useRef } from "react";
import "./Audio.css";

export default function Audio() {
  const [houses, setHouses] = useState([]);
  const [selectedId, setSelectedId] = useState("");
  const [isLoadingHouses, setIsLoadingHouses] = useState(false);
  const [isGeneratingAudio, setIsGeneratingAudio] = useState(false);
  const [error, setError] = useState("");

  const audioRef = useRef(null);
  let currentAudioURL = null;

  // -------------------------------
  // Load house list on mount
  // -------------------------------
  useEffect(() => {
    const loadHouses = async () => {
      try {
        setIsLoadingHouses(true);
        const res = await fetch("http://localhost:4000/api/houses");
        if (!res.ok) throw new Error("Failed to fetch houses");
        const data = await res.json();

        setHouses(data || []);
        if (data.length > 0) setSelectedId(data[0].id.toString());

      } catch (err) {
        console.error(err);
        setError("Could not load houses.");
      } finally {
        setIsLoadingHouses(false);
      }
    };

    loadHouses();
  }, []);

  // -------------------------------
  // Generate and Play Audio
  // -------------------------------
  const playAudio = async () => {
    if (!selectedId) return setError("Choose a house first.");

    try {
      setError("");
      setIsGeneratingAudio(true);

      // Fetch house details
      const res = await fetch(`http://localhost:4000/api/houses/${selectedId}`);
      if (!res.ok) throw new Error("Failed to fetch house");
      const house = await res.json();

      // Text for narration
      const narration = `
You are viewing ${house.title} at ${house.address}.
Average bills: £${house.avgBills}
Landlord rating: ${house.landlordRating}
Pros: ${house.areaPros}
Cons: ${house.areaCons}
      `;

      // Request TTS audio
      const audioRes = await fetch("http://localhost:4000/api/audio", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          text: narration,
          voice: "21m00Tcm4TlvDq8ikWAM",
        }),
      });

      if (!audioRes.ok) throw new Error("Audio generation failed");

      // Convert response to playable audio
      const buffer = await audioRes.arrayBuffer();
      const blob = new Blob([buffer], { type: "audio/mpeg" });
      const url = URL.createObjectURL(blob);

      // Revoke old object URLs to avoid memory leaks
      if (currentAudioURL) URL.revokeObjectURL(currentAudioURL);
      currentAudioURL = url;

      // FINAL MERGED TEST.HTML LOGIC ⬇⬇⬇
      audioRef.current.src = url;
      await audioRef.current.play().catch(() => console.warn("Autoplay blocked"));

    } catch (err) {
      console.error(err);
      setError(err.message ?? "Something went wrong.");
    } finally {
      setIsGeneratingAudio(false);
    }
  };


  return (
    <div className="audio-page">
      <h1>Housr Viewing Narration</h1>

      <label>Select house:</label>
      <select
        value={selectedId}
        onChange={(e) => setSelectedId(e.target.value)}
        disabled={!houses.length}
      >
        {houses.map(h => (
          <option key={h.id} value={h.id}>{h.title}</option>
        ))}
      </select>

      <button onClick={playAudio} disabled={isGeneratingAudio || !houses.length}>
        {isGeneratingAudio ? "Generating..." : "Play Audio"}
      </button>

      {error && <p style={{color:"red"}}>{error}</p>}

      {/* Audio behaves exactly like test.html */}
      <audio ref={audioRef} controls style={{marginTop:"1rem", width:"100%"}} />
    </div>
  );
}
