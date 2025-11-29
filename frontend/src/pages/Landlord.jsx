import { useState } from "react";
import "./Landlord.css";

export default function Landlord() {
  const [propertyInfo, setPropertyInfo] = useState("");
  const [propertyCode, setPropertyCode] = useState("");

  const generateCode = () => {
    const code = Math.floor(100000 + Math.random() * 900000).toString();
    setPropertyCode(code);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!propertyInfo) return alert("Please enter property details first.");

    const data = { description: propertyInfo, code: propertyCode };

    try {
      const response = await fetch("http://localhost:4000/api/property", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      const result = await response.json();
      alert("Property saved successfully! Client code: " + result.code);
    } catch (err) {
      console.error(err);
      alert("Error sending data to backend.");
    }
  };

  return (
    <div className="landlord-body">
      <div className="landlord-shell">
        <div className="window">
          <div className="titlebar">
            <p>Landlord Portal</p>
          </div>

          <div className="inner">
            <div className="header-row">
              <div>
                <h1>Upload Property Details</h1>
                <p className="subtitle">
                  Generate a 6-digit viewing code and store listing information
                  securely.
                </p>
              </div>
              <div className="icon-circle">🏠</div>
            </div>

            <form onSubmit={handleSubmit}>
              <label>Property Description</label>
              <textarea
                value={propertyInfo}
                onChange={(e) => setPropertyInfo(e.target.value)}
                placeholder="Property features, pricing, neighbourhood info..."
                rows={6}
              />

              <div className="buttons">
                <button
                  type="button"
                  className="generate-btn"
                  onClick={generateCode}
                >
                  Generate 6-Digit Code
                </button>

                <button type="submit" className="save-btn">
                  Save Property
                </button>
              </div>

              {propertyCode && (
                <div className="code-display">
                  🔑 Viewing Code: <b>{propertyCode}</b>
                </div>
              )}
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
