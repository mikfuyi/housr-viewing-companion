import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Client() {
  const [code, setCode] = useState("");
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!code.trim()) return;

    // Redirect to new audio page
    navigate(`/audio?code=${code}`);
  };

  return (
    <div className="client-page">
      <h1>Enter Home Code</h1>

      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Enter the house code"
          value={code}
          onChange={(e) => setCode(e.target.value)}
        />
        <button type="submit">View Home Audio Guide</button>
      </form>
    </div>
  );
}
