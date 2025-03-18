function TransactionHistory({ transactions }) {
    if (transactions.length === 0) {
      return (
        <div className="function-card">
          <h2>Transaction History</h2>
          <div className="no-transactions">No transactions found</div>
        </div>
      )
    }
  
    return (
      <div className="function-card">
        <h2>Transaction History</h2>
        <div className="transactions-list">
          {transactions.map((tx) => (
            <div key={tx.id} className="transaction-item">
              <div className="transaction-header">
                <span className={`transaction-type ${tx.type.toLowerCase()}`}>{tx.type}</span>
                <span className="transaction-time">{tx.timestamp}</span>
              </div>
              <div className="transaction-details">{tx.details}</div>
              <div className="transaction-hash">
                <a href={`https://etherscan.io/tx/${tx.hash}`} target="_blank" rel="noopener noreferrer">
                  View on Etherscan
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>
    )
  }
  
  export default TransactionHistory
  
  