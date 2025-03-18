"use client"

import { useState } from "react"

function TransferForm({ onTransfer, loading, symbol = "Tokens" }) {
  const [recipient, setRecipient] = useState("")
  const [amount, setAmount] = useState("")
  const [message, setMessage] = useState({ text: "", type: "" })

  const handleSubmit = async (e) => {
    e.preventDefault()
    setMessage({ text: "", type: "" })

    try {
      const result = await onTransfer(recipient, amount)

      if (result.success) {
        setMessage({
          text: `Successfully transferred ${amount} ${symbol} to ${recipient}`,
          type: "success",
        })
        setAmount("")
      } else {
        setMessage({
          text: "Failed to transfer tokens. Please try again.",
          type: "error",
        })
      }
    } catch (error) {
      setMessage({
        text: "An error occurred during transfer.",
        type: "error",
      })
    }
  }

  return (
    <form onSubmit={handleSubmit} className="contract-form">
      <div className="form-group">
        <label>Recipient Address:</label>
        <input
          type="text"
          value={recipient}
          onChange={(e) => setRecipient(e.target.value)}
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
        {loading ? "Processing..." : "Transfer"}
      </button>
    </form>
  )
}

export default TransferForm

