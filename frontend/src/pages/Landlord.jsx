import { useState } from "react";

export default function Landlord() {
  const [propertyInfo, setPropertyInfo] = useState("");
  const [propertyCode, setPropertyCode] = useState("");

  // Generate a random unique 4-digit house code
  const generateCode = () => {
    const code = Math.floor(1000 + Math.random() * 9000).toString();
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
    <div style={{ padding: "2rem" }}>
      <h1>👨‍💼 Landlord Portal</h1>
      <p>Upload property details & generate a client viewing access code.</p>

      <form onSubmit={handleSubmit} style={{ marginTop: "2rem", maxWidth: "500px" }}>

        <label style={{ fontWeight: "bold" }}>Property Description</label>
        <textarea
          value={propertyInfo}
          onChange={(e) => setPropertyInfo(e.target.value)}
          placeholder="Enter home details, features, rent, neighbourhood info..."
          rows={6}
          style={{
            width: "100%",
            padding: "10px",
            borderRadius: "5px",
            marginTop: "0.5rem",
            border: "1px solid #bbb"
          }}
        />

        <div style={{ marginTop: "1.5rem" }}>
          <button
            type="button"
            onClick={generateCode}
            style={{
              padding: "10px 20px",
              background: "black",
              color: "white",
              borderRadius: "6px"
            }}
          >
            Generate 4-Digit Code
          </button>
        </div>

        {propertyCode && (
          <h2 style={{ marginTop: "1rem" }}>🔑 Viewing Code: <b>{propertyCode}</b></h2>
        )}

        <button
          type="submit"
          style={{
            marginTop: "1.5rem",
            padding: "12px 25px",
            background: "#007bff",
            color: "white",
            borderRadius: "6px",
            fontSize: "16px"
          }}
        >
          Save Property
        </button>
      </form>
    </div>
  );
}
