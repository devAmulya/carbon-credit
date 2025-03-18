"use client"

import { useState } from "react"

function BurnCreditsForm({ onBurnCredits, loading, balance, symbol = "Credits" }) {
  const [amount, setAmount] = useState("")
  const [message, setMessage] = useState({ text: "", type: "" })

  const handleSubmit = async (e) => {
    e.preventDefault()
    setMessage({ text: "", type: "" })

    if (Number.parseFloat(amount) > Number.parseFloat(balance)) {
      setMessage({
        text: `Cannot burn more than your balance of ${balance} ${symbol}`,
        type: "error",
      })
      return
    }

    try {
      const result = await onBurnCredits(amount)

      if (result.success) {
        setMessage({
          text: `Successfully burned ${amount} ${symbol}`,
          type: "success",
        })
        setAmount("")
      } else {
        setMessage({
          text: "Failed to burn credits. Please try again.",
          type: "error",
        })
      }
    } catch (error) {
      setMessage({
        text: "An error occurred during burning.",
        type: "error",
      })
    }
  }

  return (
    <form onSubmit={handleSubmit} className="contract-form">
      <div className="form-group">
        <label>Amount to Burn:</label>
        <div className="input-with-symbol">
          <input
            type="text"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            placeholder="0.0"
            required
            className="form-input"
          />
          <span className="input-symbol">{symbol}</span>
        </div>
      </div>

      <div className="balance-display">
        <span>Your Balance:</span>
        <span className="balance-value">
          {balance} {symbol}
        </span>
      </div>

      {message.text && <div className={`form-message ${message.type}`}>{message.text}</div>}

      <button type="submit" disabled={loading} className="form-button">
        {loading ? "Processing..." : "Burn Credits"}
      </button>
    </form>
  )
}

export default BurnCreditsForm

