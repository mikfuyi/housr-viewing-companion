import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Client.css";

export default function Client() {
  const [code, setCode] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();
    const handleCodeChange = (e) => {
    const value = e.target.value.replace(/\D/g, ""); // allow digits only
    if (value.length <= 6) {
      setCode(value);
      setError("");
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!code.trim()) return;

    // Redirect to new audio page
    navigate(`/audio?code=${code}`);
  };

  return (
    <div className="client-body">
      <div className="client-shell">
        <div className="window">
          <div className="titlebar">
            <p>Client Viewer</p>
          </div>

          <div className="inner">
            <div className="header-row">
              <div>
                <h1>Enter Property Code</h1>
                <p className="subtitle">
                  Enter the 6-digit code provided at the property to start your
                  audio-guided viewing.
                </p>
              </div>
              <div className="icon-circle">🔊</div>
            </div>

            <form onSubmit={handleSubmit} className="form">
              <label>6-digit viewing code</label>

              <input
                type="text"
                inputMode="numeric"
                maxLength={6}
                value={code}
                onChange={handleCodeChange}
                placeholder="000000"
                className="code-input"
                autoFocus
              />

              <p className="digit-count">{code.length}/6 digits</p>

              {error && <div className="error-box">{error}</div>}

              <button
                type="submit"
                className={`start-btn ${
                  code.length === 6 ? "active" : "disabled"
                }`}
                disabled={code.length !== 6}
              >
                Start Viewing Tour
              </button>
            </form>

            <div className="features">
              <p className="features-title">What you’ll get during the tour</p>

              <div className="feature-grid">
                <div className="feature-card">
                  <div className="feature-emoji">📊</div>
                  <div className="feature-heading">Property Breakdown</div>
                  <div className="feature-text">Bills, energy rating & key details.</div>
                </div>

                <div className="feature-card">
                  <div className="feature-emoji">🏘️</div>
                  <div className="feature-heading">Area Insights</div>
                  <div className="feature-text">Safety, transport & amenities nearby.</div>
                </div>

                <div className="feature-card">
                  <div className="feature-emoji">🎯</div>
                  <div className="feature-heading">Personalized</div>
                  <div className="feature-text">Answers tuned to what you care about.</div>
                </div>

                <div className="feature-card">
                  <div className="feature-emoji">🎙️</div>
                  <div className="feature-heading">Live Audio Guide</div>
                  <div className="feature-text">Ask questions as you walk the property.</div>
                </div>
              </div>
            </div>

          </div>
        </div>
      </div>
    </div>
  );
}
