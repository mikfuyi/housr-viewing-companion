import { Routes, Route, Link } from "react-router-dom";
import Home from "./pages/Home.jsx";
import Landlord from "./pages/Landlord.jsx";
import Client from "./pages/Client.jsx";

export default function App() {
  return (
    <div>
      <nav style={{ display: "flex", gap: "1rem", padding:"1rem" }}>
        <Link to="/">Home</Link>
        <Link to="/landlord">Landlord</Link>
        <Link to="/viewer">Client</Link>
      </nav>

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/landlord" element={<Landlord />} />
        <Route path="/viewer" element={<Client />} />
      </Routes>
    </div>
  );
}
