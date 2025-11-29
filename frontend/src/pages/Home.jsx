import { Link } from "react-router-dom";
import "./Home.css"; // IMPORTANT

export default function Home() {
  return (
    <div className="home-body">

      <div className="content-container">

        {/* Left Section */}
        <div className="hero-text">
          <span className="tag">AI-Guided Property Viewings</span>

          <h1>Housr Viewing Companion</h1>
          <p>
            A smarter desktop companion for viewing properties. 
            Landlords upload details once. Viewers arrive, enter a code, 
            and get a guided room-by-room walkthrough.
          </p>

          <div className="button-row">
            <Link to="/landlord"><button className="primary-btn">Landlord Portal →</button></Link>
            <Link to="/client"><button className="secondary-btn">Client Viewer ▶</button></Link>
          </div>

          <p className="sub-text">No install. No app. Just a code.</p>
        </div>

        {/* Right Side: Macbook Mock Screen */}
        <div className="macbook">
          <div className="screen">
            <div className="top-bar">
            </div>

            <div className="screen-content">
              <h3>Viewing Overview</h3>
              <p className="addr">24B Claremont Road</p>
              <p className="time">Live Tour · 12:30</p>

              <div className="cards">
                <div className="card">
                  <h4>Landlord</h4>
                  <p>Upload & generate viewing code instantly.</p>
                </div>
                <div className="card">
                  <h4>Client</h4>
                  <p>Join tour with code — guided walkthrough.</p>
                </div>
              </div>

              <div className="footer-card">Start Client Session ⬤ Desktop Companion</div>
            </div>
          </div>
          <div className="base"></div>
        </div>

      </div>
    </div>
  );
}
