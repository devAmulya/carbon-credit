"use client"

import { useState, useEffect } from "react"

function BuyCreditsForm({ onBuyCredits, loading, tokenPrice }) {
  const [amount, setAmount] = useState("")
  const [totalCost, setTotalCost] = useState("0")
  const [message, setMessage] = useState({ text: "", type: "" })

  useEffect(() => {
    if (amount && tokenPrice) {
      const cost = Number.parseFloat(amount) * Number.parseFloat(tokenPrice)
      setTotalCost(cost.toFixed(6))
    } else {
      setTotalCost("0")
    }
  }, [amount, tokenPrice])

  const handleSubmit = async (e) => {
    e.preventDefault()
    setMessage({ text: "", type: "" })

    try {
      const result = await onBuyCredits(amount)

      if (result.success) {
        setMessage({
          text: `Successfully purchased ${amount} credits`,
          type: "success",
        })
        setAmount("")
      } else {
        setMessage({
          text: "Failed to buy credits. Please try again.",
          type: "error",
        })
      }
    } catch (error) {
      setMessage({
        text: "An error occurred during purchase.",
        type: "error",
      })
    }
  }

  return (
    <form onSubmit={handleSubmit} className="contract-form">
      <div className="form-group">
        <label>Amount to Buy:</label>
        <div className="input-with-symbol">
          <input
            type="text"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            placeholder="0.0"
            required
            className="form-input"
          />
          <span className="input-symbol">Credits</span>
        </div>
      </div>

      <div className="cost-display">
        <span>Cost:</span>
        <span className="cost-value">{totalCost} ETH</span>
        <span className="price-info">(Price: {tokenPrice} ETH per token)</span>
      </div>

      {message.text && <div className={`form-message ${message.type}`}>{message.text}</div>}

      <button type="submit" disabled={loading} className="form-button">
        {loading ? "Processing..." : "Buy Credits"}
      </button>
    </form>
  )
}

export default BuyCreditsForm

