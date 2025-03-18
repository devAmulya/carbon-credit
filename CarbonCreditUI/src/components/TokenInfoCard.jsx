function TokenInfoCard({ tokenData }) {
    return (
      <div className="token-info-card">
        <h2>Token Information</h2>
        <div className="token-info-grid">
          <div className="token-info-item">
            <span className="info-label">Name:</span>
            <span className="info-value">{tokenData.name || "Loading..."}</span>
          </div>
          <div className="token-info-item">
            <span className="info-label">Symbol:</span>
            <span className="info-value">{tokenData.symbol || "Loading..."}</span>
          </div>
          <div className="token-info-item">
            <span className="info-label">Decimals:</span>
            <span className="info-value">{tokenData.decimals || "Loading..."}</span>
          </div>
          <div className="token-info-item">
            <span className="info-label">Total Supply:</span>
            <span className="info-value">
              {tokenData.totalSupply || "Loading..."} {tokenData.symbol}
            </span>
          </div>
          <div className="token-info-item">
            <span className="info-label">Your Balance:</span>
            <span className="info-value">
              {tokenData.balance || "Loading..."} {tokenData.symbol}
            </span>
          </div>
          <div className="token-info-item">
            <span className="info-label">Token Price:</span>
            <span className="info-value">{tokenData.tokenPrice || "Loading..."} ETH</span>
          </div>
        </div>
      </div>
    )
  }
  
  export default TokenInfoCard
  
  