import { Routes, Route, Link } from "react-router-dom";
import Home from "./pages/Home.jsx";
import Landlord from "./pages/Landlord.jsx";
import Client from "./pages/Client.jsx";
import "./App.css";

function App() {
  return (
    <div className="App" style={{ fontFamily: "system-ui" }}>
      {/* Simple nav bar */}
      <nav
        style={{
          padding: "1rem",
          display: "flex",
          gap: "1.5rem",
          background: "#f5f5f5",
          borderBottom: "1px solid #ddd",
        }}
      >
        <Link to="/">Home</Link>
        <Link to="/landlord">Landlord</Link>
        <Link to="/viewer">Client</Link>
      </nav>

      {/* Page content */}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/landlord" element={<Landlord />} />
        <Route path="/viewer" element={<Client />} />
      </Routes>
    </div>
  );
}

export default App;
