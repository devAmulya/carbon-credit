"use client"

import { useState } from "react"
import "./LoginSignup.css"

function LoginSignup({ onLogin }) {
  const [isLogin, setIsLogin] = useState(true)
  const [username, setUsername] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [confirmPassword, setConfirmPassword] = useState("")
  const [error, setError] = useState("")
  const [loading, setLoading] = useState(false)

  const handleSubmit = (e) => {
    e.preventDefault()
    setError("")

    if (isLogin) {
      // Login logic
      setLoading(true)

      // Simulate API call
      setTimeout(() => {
        // In a real app, you would validate against a backend
        if (username === "demo" && password === "password") {
          onLogin({ username, email: "demo@example.com" })
        } else {
          setError("Invalid username or password. Try demo/password")
        }
        setLoading(false)
      }, 1000)
    } else {
      // Signup logic
      if (password !== confirmPassword) {
        setError("Passwords do not match")
        return
      }

      setLoading(true)

      // Simulate API call
      setTimeout(() => {
        // In a real app, you would create a user in your backend
        onLogin({ username, email })
        setLoading(false)
      }, 1000)
    }
  }

  return (
    <div className="auth-container">
      <div className="auth-card">
        <div className="auth-header">
          <h2>{isLogin ? "Login" : "Sign Up"}</h2>
          <div className="auth-toggle">
            <button className={isLogin ? "active" : ""} onClick={() => setIsLogin(true)}>
              Login
            </button>
            <button className={!isLogin ? "active" : ""} onClick={() => setIsLogin(false)}>
              Sign Up
            </button>
          </div>
        </div>

        {error && <div className="auth-error">{error}</div>}

        <form onSubmit={handleSubmit} className="auth-form">
          <div className="form-group">
            <label>Username</label>
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
              placeholder="Enter your username"
            />
          </div>

          {!isLogin && (
            <div className="form-group">
              <label>Email</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                placeholder="Enter your email"
              />
            </div>
          )}

          <div className="form-group">
            <label>Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              placeholder="Enter your password"
            />
          </div>

          {!isLogin && (
            <div className="form-group">
              <label>Confirm Password</label>
              <input
                type="password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                required
                placeholder="Confirm your password"
              />
            </div>
          )}

          <button type="submit" className="auth-button" disabled={loading}>
            {loading ? "Processing..." : isLogin ? "Login" : "Sign Up"}
          </button>
        </form>

        {isLogin && (
          <div className="auth-help">
            <p>Demo account: username "demo" / password "password"</p>
            <a
              href="#"
              onClick={(e) => {
                e.preventDefault()
                alert("Password reset functionality would be implemented here")
              }}
            >
              Forgot password?
            </a>
          </div>
        )}
      </div>
    </div>
  )
}

export default LoginSignup

