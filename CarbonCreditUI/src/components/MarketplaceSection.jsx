"use client"

import { useState, useEffect } from "react"
import { ethers } from "ethers"

function MarketplaceSection({ contract, account, onListForSale, onBuyFromMarket, loading, balance, symbol }) {
  const [listAmount, setListAmount] = useState("")
  const [listPrice, setListPrice] = useState("")
  const [message, setMessage] = useState({ text: "", type: "" })
  const [activeSales, setActiveSales] = useState([])
  const [saleCounter, setSaleCounter] = useState(0)
  const [loadingSales, setLoadingSales] = useState(false)

  useEffect(() => {
    if (contract) {
      fetchSales()
    }
  }, [contract, account])

  const fetchSales = async () => {
    try {
      setLoadingSales(true)
      const counter = await contract.saleCounter()
      setSaleCounter(counter)

      const sales = []
      for (let i = 0; i < counter; i++) {
        const sale = await contract.sales(i)
        if (sale.amount > 0) {
          sales.push({
            id: i,
            seller: sale.seller,
            amount: ethers.formatEther(sale.amount),
            pricePerToken: ethers.formatEther(sale.pricePerToken),
            totalPrice: ethers.formatEther((sale.amount * sale.pricePerToken) / ethers.parseEther("1")),
          })
        }
      }
      setActiveSales(sales)
    } catch (error) {
      console.error("Error fetching sales:", error)
    } finally {
      setLoadingSales(false)
    }
  }

  const handleListSubmit = async (e) => {
    e.preventDefault()
    setMessage({ text: "", type: "" })

    if (Number.parseFloat(listAmount) > Number.parseFloat(balance)) {
      setMessage({
        text: `Cannot list more than your balance of ${balance} ${symbol}`,
        type: "error",
      })
      return
    }

    try {
      const result = await onListForSale(listAmount, listPrice)

      if (result.success) {
        setMessage({
          text: `Successfully listed ${listAmount} ${symbol} for sale at ${listPrice} ETH each`,
          type: "success",
        })
        setListAmount("")
        setListPrice("")
        fetchSales()
      } else {
        setMessage({
          text: "Failed to list tokens for sale. Please try again.",
          type: "error",
        })
      }
    } catch (error) {
      setMessage({
        text: "An error occurred during listing.",
        type: "error",
      })
    }
  }

  const handleBuy = async (saleId, totalPrice) => {
    try {
      const result = await onBuyFromMarket(saleId, totalPrice)

      if (result.success) {
        alert(`Successfully purchased tokens from sale #${saleId}`)
        fetchSales()
      } else {
        alert("Failed to purchase tokens. Please try again.")
      }
    } catch (error) {
      console.error("Error buying from market:", error)
      alert("An error occurred during purchase.")
    }
  }

  return (
    <div className="marketplace-section">
      <div className="function-card">
        <h2>List Tokens For Sale</h2>
        <form onSubmit={handleListSubmit} className="contract-form">
          <div className="form-group">
            <label>Amount to List:</label>
            <div className="input-with-symbol">
              <input
                type="text"
                value={listAmount}
                onChange={(e) => setListAmount(e.target.value)}
                placeholder="0.0"
                required
                className="form-input"
              />
              <span className="input-symbol">{symbol}</span>
            </div>
          </div>

          <div className="form-group">
            <label>Price Per Token (ETH):</label>
            <div className="input-with-symbol">
              <input
                type="text"
                value={listPrice}
                onChange={(e) => setListPrice(e.target.value)}
                placeholder="0.0"
                required
                className="form-input"
              />
              <span className="input-symbol">ETH</span>
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
            {loading ? "Processing..." : "List For Sale"}
          </button>
        </form>
      </div>

      <div className="function-card">
        <h2>Active Listings</h2>
        {loadingSales ? (
          <div className="loading-sales">Loading sales data...</div>
        ) : activeSales.length > 0 ? (
          <div className="sales-list">
            {activeSales.map((sale) => (
              <div key={sale.id} className="sale-item">
                <div className="sale-details">
                  <div className="sale-header">
                    <span className="sale-id">Sale #{sale.id}</span>
                    <span
                      className={`sale-seller ${sale.seller.toLowerCase() === account.toLowerCase() ? "your-sale" : ""}`}
                    >
                      {sale.seller.toLowerCase() === account.toLowerCase()
                        ? "Your Listing"
                        : `Seller: ${sale.seller.substring(0, 6)}...${sale.seller.substring(38)}`}
                    </span>
                  </div>
                  <div className="sale-info">
                    <div className="sale-amount">
                      {sale.amount} {symbol}
                    </div>
                    <div className="sale-price">{sale.pricePerToken} ETH per token</div>
                    <div className="sale-total">Total: {sale.totalPrice} ETH</div>
                  </div>
                </div>
                {sale.seller.toLowerCase() !== account.toLowerCase() && (
                  <button onClick={() => handleBuy(sale.id, sale.totalPrice)} disabled={loading} className="buy-button">
                    {loading ? "Processing..." : "Buy Now"}
                  </button>
                )}
              </div>
            ))}
          </div>
        ) : (
          <div className="no-sales">No active listings found</div>
        )}
      </div>
    </div>
  )
}

export default MarketplaceSection

