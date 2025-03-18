"use client"
import { useState, useEffect } from "react"
import ContractInterface from "./ContractInterface"
import "./HomePage.css"
import LoginSignup from "./components/LoginSignup"

function HomePage() {
  const [activeSection, setActiveSection] = useState("home")
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [user, setUser] = useState(null)

  // Check if user is already logged in from localStorage
  useEffect(() => {
    const savedUser = localStorage.getItem("user")
    if (savedUser) {
      setUser(JSON.parse(savedUser))
      setIsAuthenticated(true)
    }
  }, [])

  const handleLogin = (userData) => {
    setUser(userData)
    setIsAuthenticated(true)
    localStorage.setItem("user", JSON.stringify(userData))
  }

  const handleLogout = () => {
    setUser(null)
    setIsAuthenticated(false)
    localStorage.removeItem("user")
    setActiveSection("home")
  }

  return (
    <div className="homepage">
      <nav className="navbar">
        <div className="logo">
          <span className="logo-icon">Ξ</span>
          <span className="logo-text">CarbonChain</span>
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
          {!isAuthenticated ? (
            <li>
              <button className={activeSection === "login" ? "active" : ""} onClick={() => setActiveSection("login")}>
                Login
              </button>
            </li>
          ) : (
            <>
              <li>
                <button
                  className={activeSection === "dashboard" ? "active" : ""}
                  onClick={() => setActiveSection("dashboard")}
                >
                  Dashboard
                </button>
              </li>
              <li>
                <button className="logout-button" onClick={handleLogout}>
                  Logout
                </button>
              </li>
            </>
          )}
        </ul>
      </nav>

      {activeSection === "home" && (
        <section className="hero-section">
          <div className="hero-content">
            <h1>Interact with Your Smart Contract</h1>
            <p>A simple and intuitive interface for managing your Ethereum smart contract</p>
            <button className="cta-button" onClick={() => setActiveSection(isAuthenticated ? "interface" : "login")}>
              {isAuthenticated ? "Launch Interface" : "Login to Start"}
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
            <div className="feature-card">
              <div className="feature-icon">🛒</div>
              <h3>Token Marketplace</h3>
              <p>Buy and sell tokens with other users through the built-in marketplace.</p>
            </div>
            <div className="feature-card">
              <div className="feature-icon">🔥</div>
              <h3>Burn Credits</h3>
              <p>Burn your tokens to reduce supply and potentially increase value.</p>
            </div>
          </div>
        </section>
      )}

      {activeSection === "login" && (
        <section className="login-section">
          <LoginSignup onLogin={handleLogin} />
        </section>
      )}

      {activeSection === "interface" && (
        <section className="interface-section">

          <div className="interface-container">
            <ContractInterface />
          </div>
        </section>
      )}

      {activeSection === "dashboard" && isAuthenticated && (
        <section className="dashboard-section">
          <h2>User Dashboard</h2>
          <div className="dashboard-container">
            <div className="user-profile">
              <div className="profile-header">
                <div className="profile-avatar">
                  <span>{user.username.charAt(0).toUpperCase()}</span>
                </div>
                <div className="profile-info">
                  <h3>{user.username}</h3>
                  <p>{user.email}</p>
                </div>
              </div>
              <div className="profile-stats">
                <div className="stat-item">
                  <span className="stat-value">0</span>
                  <span className="stat-label">Transactions</span>
                </div>
                <div className="stat-item">
                  <span className="stat-value">0</span>
                  <span className="stat-label">Tokens</span>
                </div>
                <div className="stat-item">
                  <span className="stat-value">0</span>
                  <span className="stat-label">Credits</span>
                </div>
              </div>
            </div>
            <div className="dashboard-actions">
              <button onClick={() => setActiveSection("interface")}>Launch Interface</button>
              <button
                onClick={() =>
                  window.open(`https://etherscan.io/address/0x4Ba0bcf170C7187c278160E5f917c119D9b8B9Eb`, "_blank")
                }
              >
                View on Etherscan
              </button>
            </div>
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

