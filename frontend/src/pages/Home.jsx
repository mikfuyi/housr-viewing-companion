import { Link } from "react-router-dom";

export default function Home() {
  return (
    <div style={{ padding: "2rem", textAlign: "center" }}>
      <h1>🏠 Housr Viewing Companion</h1>
      <p style={{ marginBottom: "2rem" }}>
        Smart voice-guided property tours with real insights while you walk.
      </p>

      <div style={{ display: "flex", justifyContent: "center", gap: "1.5rem" }}>

        <Link to="/landlord">
          <button
            style={{
              padding: "1rem 2rem",
              fontSize: "1.1rem",
              borderRadius: "8px",
              border: "none",
              cursor: "pointer",
              background: "#2e86ff",
              color: "white",
              fontWeight: "600"
            }}
          >
            👤 I am a Landlord
          </button>
        </Link>

        <Link to="/viewer">
          <button
            style={{
              padding: "1rem 2rem",
              fontSize: "1.1rem",
              borderRadius: "8px",
              border: "none",
              cursor: "pointer",
              background: "#28c76f",
              color: "white",
              fontWeight: "600"
            }}
          >
            🔊 I am Viewing a Property
          </button>
        </Link>

      </div>
    </div>
  );
}
