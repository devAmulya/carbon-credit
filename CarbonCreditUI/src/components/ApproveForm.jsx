"use client"

import { useState } from "react"

function ApproveForm({ onApprove, loading, symbol = "Tokens" }) {
  const [spenderAddress, setSpenderAddress] = useState("")
  const [amount, setAmount] = useState("")
  const [message, setMessage] = useState({ text: "", type: "" })

  const handleSubmit = async (e) => {
    e.preventDefault()
    setMessage({ text: "", type: "" })

    try {
      const result = await onApprove(spenderAddress, amount)

      if (result.success) {
        setMessage({
          text: `Successfully approved ${amount} ${symbol} for ${spenderAddress}`,
          type: "success",
        })
        setAmount("")
      } else {
        setMessage({
          text: "Failed to approve tokens. Please try again.",
          type: "error",
        })
      }
    } catch (error) {
      setMessage({
        text: "An error occurred during approval.",
        type: "error",
      })
    }
  }

  return (
    <form onSubmit={handleSubmit} className="contract-form">
      <div className="form-group">
        <label>Spender Address:</label>
        <input
          type="text"
          value={spenderAddress}
          onChange={(e) => setSpenderAddress(e.target.value)}
          placeholder="0x..."
          required
          className="form-input"
        />
      </div>

      <div className="form-group">
        <label>Amount:</label>
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

      {message.text && <div className={`form-message ${message.type}`}>{message.text}</div>}

      <button type="submit" disabled={loading} className="form-button">
        {loading ? "Processing..." : "Approve"}
      </button>
    </form>
  )
}

export default ApproveForm

