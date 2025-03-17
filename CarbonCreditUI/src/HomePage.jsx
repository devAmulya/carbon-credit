"use client"
import { useState } from "react"
import App from "./App"
import "./HomePage.css"

function HomePage() {
  const [activeSection, setActiveSection] = useState("home")

  return (
    <div className="homepage">
      <nav className="navbar">
        <div className="logo">
          <span className="logo-icon">Ξ</span>
          <span className="logo-text">EthContract</span>
        </div>
        <ul className="nav-links">
          <li>
            <button className={activeSection === "home" ? "active" : ""} onClick={() => setActiveSection("home")}>
              Home
            </button>
          </li>
          <li>
            <button
              className={activeSection === "features" ? "active" : ""}
              onClick={() => setActiveSection("features")}
            >
              Features
            </button>
          </li>
          <li>
            <button
              className={activeSection === "interface" ? "active" : ""}
              onClick={() => setActiveSection("interface")}
            >
              Interface
            </button>
          </li>
        </ul>
      </nav>

      {activeSection === "home" && (
        <section className="hero-section">
          <div className="hero-content">
            <h1>Interact with Your Smart Contract</h1>
            <p>A simple and intuitive interface for managing your Ethereum smart contract</p>
            <button className="cta-button" onClick={() => setActiveSection("interface")}>
              Launch Interface
            </button>
          </div>
          <div className="hero-image">
            <div className="eth-symbol">Ξ</div>
            <div className="glow-effect"></div>
          </div>
        </section>
      )}

      {activeSection === "features" && (
        <section className="features-section">
          <h2>Contract Features</h2>
          <div className="features-grid">
            <div className="feature-card">
              <div className="feature-icon">🔐</div>
              <h3>Token Approvals</h3>
              <p>Easily approve spenders to use tokens on your behalf with a simple interface.</p>
            </div>
            <div className="feature-card">
              <div className="feature-icon">💸</div>
              <h3>Transfer Tokens</h3>
              <p>Send tokens to any address with just a few clicks.</p>
            </div>
            <div className="feature-card">
              <div className="feature-icon">📊</div>
              <h3>View Balances</h3>
              <p>Check your token balance and allowances in real-time.</p>
            </div>
            <div className="feature-card">
              <div className="feature-icon">🔄</div>
              <h3>Transaction History</h3>
              <p>View your past interactions with the contract.</p>
            </div>
          </div>
        </section>
      )}

      {activeSection === "interface" && (
        <section className="interface-section">
          <h2>Contract Interface</h2>
          <div className="interface-container">
            <App />
          </div>
        </section>
      )}

      <footer className="footer">
        <p>Contract Address: 0x4Ba0bcf170C7187c278160E5f917c119D9b8B9Eb</p>
        <p>&copy; {new Date().getFullYear()} EthContract Interface</p>
      </footer>
    </div>
  )
}

export default HomePage