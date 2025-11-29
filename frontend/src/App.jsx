import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home.jsx";
import Landlord from "./pages/Landlord.jsx";
import Client from "./pages/Client.jsx";

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/landlord" element={<Landlord />} />
      <Route path="/client" element={<Client />} />
    </Routes>
  );
}
