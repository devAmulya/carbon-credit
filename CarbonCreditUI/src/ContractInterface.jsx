"use client"

import { useState } from "react"
import { ethers } from "ethers"
import "./app.css"

// Component imports
import TransferForm from "./components/TransferForm"
import BuyCreditsForm from "./components/BuyCreditsForm.jsx"
import BurnCreditsForm from "./components/BurnCreditsForm"
import MarketplaceSection from "./components/MarketplaceSection"
import TokenInfoCard from "./components/TokenInfoCard"
import ApproveForm from "./components/ApproveForm"
import TransactionHistory from "./components/TransactionHistory"

function ContractInterface() {
  const [account, setAccount] = useState("")
  const [contract, setContract] = useState(null)
  const [isConnected, setIsConnected] = useState(false)
  const [loading, setLoading] = useState(false)
  const [tokenData, setTokenData] = useState({
    name: "",
    symbol: "",
    decimals: 0,
    totalSupply: "0",
    balance: "0",
    tokenPrice: "0",
  })
  const [activeTab, setActiveTab] = useState("dashboard")
  const [isOwner, setIsOwner] = useState(false)
  const [transactions, setTransactions] = useState([])

  const contractAddress = "0x4Ba0bcf170C7187c278160E5f917c119D9b8B9Eb"
  const contractABI = [
    // ABI content from your provided file
    {
      inputs: [
        {
          internalType: "address",
          name: "spender",
          type: "address",
        },
        {
          internalType: "uint256",
          name: "value",
          type: "uint256",
        },
      ],
      name: "approve",
      outputs: [
        {
          internalType: "bool",
          name: "",
          type: "bool",
        },
      ],
      stateMutability: "nonpayable",
      type: "function",
    },
    {
      inputs: [
        {
          internalType: "uint256",
          name: "_amount",
          type: "uint256",
        },
      ],
      name: "burnCredits",
      outputs: [],
      stateMutability: "nonpayable",
      type: "function",
    },
    {
      inputs: [
        {
          internalType: "uint256",
          name: "amount",
          type: "uint256",
        },
      ],
      name: "buyCredits",
      outputs: [],
      stateMutability: "payable",
      type: "function",
    },
    {
      inputs: [
        {
          internalType: "uint256",
          name: "saleId",
          type: "uint256",
        },
      ],
      name: "buyFromMarket",
      outputs: [],
      stateMutability: "payable",
      type: "function",
    },
    {
      inputs: [],
      stateMutability: "nonpayable",
      type: "constructor",
    },
    {
      inputs: [
        {
          internalType: "address",
          name: "spender",
          type: "address",
        },
        {
          internalType: "uint256",
          name: "allowance",
          type: "uint256",
        },
        {
          internalType: "uint256",
          name: "needed",
          type: "uint256",
        },
      ],
      name: "ERC20InsufficientAllowance",
      type: "error",
    },
    {
      inputs: [
        {
          internalType: "address",
          name: "sender",
          type: "address",
        },
        {
          internalType: "uint256",
          name: "balance",
          type: "uint256",
        },
        {
          internalType: "uint256",
          name: "needed",
          type: "uint256",
        },
      ],
      name: "ERC20InsufficientBalance",
      type: "error",
    },
    {
      inputs: [
        {
          internalType: "address",
          name: "approver",
          type: "address",
        },
      ],
      name: "ERC20InvalidApprover",
      type: "error",
    },
    {
      inputs: [
        {
          internalType: "address",
          name: "receiver",
          type: "address",
        },
      ],
      name: "ERC20InvalidReceiver",
      type: "error",
    },
    {
      inputs: [
        {
          internalType: "address",
          name: "sender",
          type: "address",
        },
      ],
      name: "ERC20InvalidSender",
      type: "error",
    },
    {
      inputs: [
        {
          internalType: "address",
          name: "spender",
          type: "address",
        },
      ],
      name: "ERC20InvalidSpender",
      type: "error",
    },
    {
      inputs: [
        {
          internalType: "uint256",
          name: "amount",
          type: "uint256",
        },
        {
          internalType: "uint256",
          name: "pricePerToken",
          type: "uint256",
        },
      ],
      name: "listForSale",
      outputs: [],
      stateMutability: "nonpayable",
      type: "function",
    },
    {
      inputs: [
        {
          internalType: "address",
          name: "owner",
          type: "address",
        },
      ],
      name: "OwnableInvalidOwner",
      type: "error",
    },
    {
      inputs: [
        {
          internalType: "address",
          name: "account",
          type: "address",
        },
      ],
      name: "OwnableUnauthorizedAccount",
      type: "error",
    },
    {
      anonymous: false,
      inputs: [
        {
          indexed: true,
          internalType: "address",
          name: "owner",
          type: "address",
        },
        {
          indexed: true,
          internalType: "address",
          name: "spender",
          type: "address",
        },
        {
          indexed: false,
          internalType: "uint256",
          name: "value",
          type: "uint256",
        },
      ],
      name: "Approval",
      type: "event",
    },
    {
      anonymous: false,
      inputs: [
        {
          indexed: true,
          internalType: "address",
          name: "previousOwner",
          type: "address",
        },
        {
          indexed: true,
          internalType: "address",
          name: "newOwner",
          type: "address",
        },
      ],
      name: "OwnershipTransferred",
      type: "event",
    },
    {
      inputs: [],
      name: "renounceOwnership",
      outputs: [],
      stateMutability: "nonpayable",
      type: "function",
    },
    {
      inputs: [
        {
          internalType: "address",
          name: "to",
          type: "address",
        },
        {
          internalType: "uint256",
          name: "value",
          type: "uint256",
        },
      ],
      name: "transfer",
      outputs: [
        {
          internalType: "bool",
          name: "",
          type: "bool",
        },
      ],
      stateMutability: "nonpayable",
      type: "function",
    },
    {
      anonymous: false,
      inputs: [
        {
          indexed: true,
          internalType: "address",
          name: "from",
          type: "address",
        },
        {
          indexed: true,
          internalType: "address",
          name: "to",
          type: "address",
        },
        {
          indexed: false,
          internalType: "uint256",
          name: "value",
          type: "uint256",
        },
      ],
      name: "Transfer",
      type: "event",
    },
    {
      inputs: [
        {
          internalType: "address",
          name: "from",
          type: "address",
        },
        {
          internalType: "address",
          name: "to",
          type: "address",
        },
        {
          internalType: "uint256",
          name: "value",
          type: "uint256",
        },
      ],
      name: "transferFrom",
      outputs: [
        {
          internalType: "bool",
          name: "",
          type: "bool",
        },
      ],
      stateMutability: "nonpayable",
      type: "function",
    },
    {
      inputs: [
        {
          internalType: "address",
          name: "newOwner",
          type: "address",
        },
      ],
      name: "transferOwnership",
      outputs: [],
      stateMutability: "nonpayable",
      type: "function",
    },
    {
      inputs: [],
      name: "withdrawFunds",
      outputs: [],
      stateMutability: "nonpayable",
      type: "function",
    },
    {
      inputs: [
        {
          internalType: "address",
          name: "owner",
          type: "address",
        },
        {
          internalType: "address",
          name: "spender",
          type: "address",
        },
      ],
      name: "allowance",
      outputs: [
        {
          internalType: "uint256",
          name: "",
          type: "uint256",
        },
      ],
      stateMutability: "view",
      type: "function",
    },
    {
      inputs: [
        {
          internalType: "address",
          name: "account",
          type: "address",
        },
      ],
      name: "balanceOf",
      outputs: [
        {
          internalType: "uint256",
          name: "",
          type: "uint256",
        },
      ],
      stateMutability: "view",
      type: "function",
    },
    {
      inputs: [
        {
          internalType: "address",
          name: "",
          type: "address",
        },
        {
          internalType: "uint256",
          name: "",
          type: "uint256",
        },
      ],
      name: "burnedCredits",
      outputs: [
        {
          internalType: "uint256",
          name: "",
          type: "uint256",
        },
      ],
      stateMutability: "view",
      type: "function",
    },
    {
      inputs: [],
      name: "decimals",
      outputs: [
        {
          internalType: "uint8",
          name: "",
          type: "uint8",
        },
      ],
      stateMutability: "view",
      type: "function",
    },
    {
      inputs: [
        {
          internalType: "address",
          name: "_user",
          type: "address",
        },
      ],
      name: "getBalance",
      outputs: [
        {
          internalType: "uint256",
          name: "",
          type: "uint256",
        },
      ],
      stateMutability: "view",
      type: "function",
    },
    {
      inputs: [
        {
          internalType: "address",
          name: "_user",
          type: "address",
        },
        {
          internalType: "uint256",
          name: "_year",
          type: "uint256",
        },
      ],
      name: "getBurnedCredits",
      outputs: [
        {
          internalType: "uint256",
          name: "",
          type: "uint256",
        },
      ],
      stateMutability: "view",
      type: "function",
    },
    {
      inputs: [],
      name: "name",
      outputs: [
        {
          internalType: "string",
          name: "",
          type: "string",
        },
      ],
      stateMutability: "view",
      type: "function",
    },
    {
      inputs: [],
      name: "owner",
      outputs: [
        {
          internalType: "address",
          name: "",
          type: "address",
        },
      ],
      stateMutability: "view",
      type: "function",
    },
    {
      inputs: [],
      name: "saleCounter",
      outputs: [
        {
          internalType: "uint256",
          name: "",
          type: "uint256",
        },
      ],
      stateMutability: "view",
      type: "function",
    },
    {
      inputs: [
        {
          internalType: "uint256",
          name: "",
          type: "uint256",
        },
      ],
      name: "sales",
      outputs: [
        {
          internalType: "address",
          name: "seller",
          type: "address",
        },
        {
          internalType: "uint256",
          name: "amount",
          type: "uint256",
        },
        {
          internalType: "uint256",
          name: "pricePerToken",
          type: "uint256",
        },
      ],
      stateMutability: "view",
      type: "function",
    },
    {
      inputs: [],
      name: "symbol",
      outputs: [
        {
          internalType: "string",
          name: "",
          type: "string",
        },
      ],
      stateMutability: "view",
      type: "function",
    },
    {
      inputs: [],
      name: "TOKEN_PRICE",
      outputs: [
        {
          internalType: "uint256",
          name: "",
          type: "uint256",
        },
      ],
      stateMutability: "view",
      type: "function",
    },
    {
      inputs: [],
      name: "totalSupply",
      outputs: [
        {
          internalType: "uint256",
          name: "",
          type: "uint256",
        },
      ],
      stateMutability: "view",
      type: "function",
    },
  ]

  const connectWallet = async () => {
    try {
      setLoading(true)
      if (window.ethereum) {
        const provider = new ethers.BrowserProvider(window.ethereum)
        const signer = await provider.getSigner()

        const contractInstance = new ethers.Contract(contractAddress, contractABI, signer)
        const accounts = await provider.send("eth_requestAccounts", [])

        setAccount(accounts[0])
        setContract(contractInstance)
        setIsConnected(true)

        // Get contract owner
        const contractOwner = await contractInstance.owner()
        setIsOwner(accounts[0].toLowerCase() === contractOwner.toLowerCase())

        // Fetch token data
        await fetchTokenData(contractInstance, accounts[0])

        // Listen for account changes
        window.ethereum.on("accountsChanged", (accounts) => {
          setAccount(accounts[0])
          fetchTokenData(contractInstance, accounts[0])
        })
      } else {
        alert("Please install MetaMask to use this dApp.")
      }
    } catch (error) {
      console.error("Error connecting wallet:", error)
      alert("Error connecting wallet. See console for details.")
    } finally {
      setLoading(false)
    }
  }

  const fetchTokenData = async (contractInstance, userAddress) => {
    try {
      const name = await contractInstance.name()
      const symbol = await contractInstance.symbol()
      const decimals = await contractInstance.decimals()
      const totalSupply = await contractInstance.totalSupply()
      const balance = await contractInstance.balanceOf(userAddress)
      const tokenPrice = await contractInstance.TOKEN_PRICE()

      setTokenData({
        name,
        symbol,
        decimals,
        totalSupply: ethers.formatEther(totalSupply),
        balance: ethers.formatEther(balance),
        tokenPrice: ethers.formatEther(tokenPrice),
      })
    } catch (error) {
      console.error("Error fetching token data:", error)
    }
  }

  const addTransaction = (type, hash, details) => {
    const newTx = {
      id: Date.now(),
      type,
      hash,
      details,
      timestamp: new Date().toLocaleString(),
    }
    setTransactions((prev) => [newTx, ...prev])
  }

  // Function to handle token transfers
  const handleTransfer = async (recipient, amount) => {
    if (!contract) return

    try {
      setLoading(true)
      const tx = await contract.transfer(recipient, ethers.parseEther(amount))
      await tx.wait()

      addTransaction("Transfer", tx.hash, `Sent ${amount} ${tokenData.symbol} to ${recipient}`)
      await fetchTokenData(contract, account)

      return { success: true, hash: tx.hash }
    } catch (error) {
      console.error("Error transferring tokens:", error)
      return { success: false, error }
    } finally {
      setLoading(false)
    }
  }

  // Function to handle token approvals
  const handleApprove = async (spender, amount) => {
    if (!contract) return

    try {
      setLoading(true)
      const tx = await contract.approve(spender, ethers.parseEther(amount))
      await tx.wait()

      addTransaction("Approval", tx.hash, `Approved ${amount} ${tokenData.symbol} for ${spender}`)

      return { success: true, hash: tx.hash }
    } catch (error) {
      console.error("Error approving tokens:", error)
      return { success: false, error }
    } finally {
      setLoading(false)
    }
  }

  // Function to handle buying credits
  const handleBuyCredits = async (amount) => {
    if (!contract) return

    try {
      setLoading(true)
      const amountInWei = ethers.parseEther(amount)
      const price = await contract.TOKEN_PRICE()
      const totalCost = (price * amountInWei) / ethers.parseEther("1")

      const tx = await contract.buyCredits(amountInWei, { value: totalCost })
      await tx.wait()

      addTransaction("Buy Credits", tx.hash, `Bought ${amount} credits`)
      await fetchTokenData(contract, account)

      return { success: true, hash: tx.hash }
    } catch (error) {
      console.error("Error buying credits:", error)
      return { success: false, error }
    } finally {
      setLoading(false)
    }
  }

  // Function to handle burning credits
  const handleBurnCredits = async (amount) => {
    if (!contract) return

    try {
      setLoading(true)
      const tx = await contract.burnCredits(ethers.parseEther(amount))
      await tx.wait()

      addTransaction("Burn Credits", tx.hash, `Burned ${amount} credits`)
      await fetchTokenData(contract, account)

      return { success: true, hash: tx.hash }
    } catch (error) {
      console.error("Error burning credits:", error)
      return { success: false, error }
    } finally {
      setLoading(false)
    }
  }

  // Function to handle listing tokens for sale
  const handleListForSale = async (amount, pricePerToken) => {
    if (!contract) return

    try {
      setLoading(true)
      const tx = await contract.listForSale(ethers.parseEther(amount), ethers.parseEther(pricePerToken))
      await tx.wait()

      addTransaction("List For Sale", tx.hash, `Listed ${amount} tokens at ${pricePerToken} ETH each`)

      return { success: true, hash: tx.hash }
    } catch (error) {
      console.error("Error listing tokens for sale:", error)
      return { success: false, error }
    } finally {
      setLoading(false)
    }
  }

  // Function to handle buying from market
  const handleBuyFromMarket = async (saleId, totalCost) => {
    if (!contract) return

    try {
      setLoading(true)
      const tx = await contract.buyFromMarket(saleId, { value: ethers.parseEther(totalCost) })
      await tx.wait()

      addTransaction("Buy From Market", tx.hash, `Bought tokens from sale #${saleId}`)
      await fetchTokenData(contract, account)

      return { success: true, hash: tx.hash }
    } catch (error) {
      console.error("Error buying from market:", error)
      return { success: false, error }
    } finally {
      setLoading(false)
    }
  }

  // Function for owner to withdraw funds
  const handleWithdrawFunds = async () => {
    if (!contract || !isOwner) return

    try {
      setLoading(true)
      const tx = await contract.withdrawFunds()
      await tx.wait()

      addTransaction("Withdraw Funds", tx.hash, `Owner withdrew funds`)

      return { success: true, hash: tx.hash }
    } catch (error) {
      console.error("Error withdrawing funds:", error)
      return { success: false, error }
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="app-container">
      <header className="app-header">
        <h1>
          <span className="eth-symbol">Ξ</span>
          {tokenData.name || "EthContract"} Interface
        </h1>
        <p className="contract-address">Contract: {contractAddress}</p>
      </header>

      <main>
        {!isConnected ? (
          <div className="connect-section">
            <div className="connect-card">
              <div className="connect-icon">
                <span className="eth-symbol">Ξ</span>
              </div>
              <h2>Connect Your Wallet</h2>
              <p>Connect your Ethereum wallet to interact with the {tokenData.name || "EthContract"} smart contract</p>
              <button className="connect-button" onClick={connectWallet} disabled={loading}>
                {loading ? "Connecting..." : "Connect Wallet"}
              </button>
            </div>
          </div>
        ) : (
          <div className="contract-interface">
            <div className="account-info">
              <div className="account-details">
                <span className="account-label">Connected Account:</span>
                <span className="account-address">{account}</span>
              </div>
              <div className="account-balance">
                <span className="balance-amount">{tokenData.balance}</span>
                <span className="balance-symbol">{tokenData.symbol}</span>
              </div>
            </div>

            <div className="interface-tabs">
              <button className={activeTab === "dashboard" ? "active" : ""} onClick={() => setActiveTab("dashboard")}>
                Dashboard
              </button>
              <button className={activeTab === "transfer" ? "active" : ""} onClick={() => setActiveTab("transfer")}>
                Transfer
              </button>
              <button className={activeTab === "approve" ? "active" : ""} onClick={() => setActiveTab("approve")}>
                Approve
              </button>
              <button className={activeTab === "credits" ? "active" : ""} onClick={() => setActiveTab("credits")}>
                Credits
              </button>
              <button
                className={activeTab === "marketplace" ? "active" : ""}
                onClick={() => setActiveTab("marketplace")}
              >
                Marketplace
              </button>
              <button className={activeTab === "history" ? "active" : ""} onClick={() => setActiveTab("history")}>
                History
              </button>
              {isOwner && (
                <button className={activeTab === "admin" ? "active" : ""} onClick={() => setActiveTab("admin")}>
                  Admin
                </button>
              )}
            </div>

            <div className="tab-content">
              {activeTab === "dashboard" && (
                <div className="dashboard-tab">
                  <TokenInfoCard tokenData={tokenData} />
                  <div className="quick-actions">
                    <h3>Quick Actions</h3>
                    <div className="action-buttons">
                      <button onClick={() => setActiveTab("transfer")}>Transfer Tokens</button>
                      <button onClick={() => setActiveTab("approve")}>Approve Spender</button>
                      <button onClick={() => setActiveTab("credits")}>Buy Credits</button>
                      <button onClick={() => setActiveTab("marketplace")}>Marketplace</button>
                    </div>
                  </div>
                </div>
              )}

              {activeTab === "transfer" && (
                <div className="function-card">
                  <h2>Transfer Tokens</h2>
                  <TransferForm onTransfer={handleTransfer} loading={loading} symbol={tokenData.symbol} />
                </div>
              )}

              {activeTab === "approve" && (
                <div className="function-card">
                  <h2>Approve Spender</h2>
                  <ApproveForm onApprove={handleApprove} loading={loading} symbol={tokenData.symbol} />
                </div>
              )}

              {activeTab === "credits" && (
                <div className="credits-tab">
                  <div className="function-card">
                    <h2>Buy Credits</h2>
                    <BuyCreditsForm
                      onBuyCredits={handleBuyCredits}
                      loading={loading}
                      tokenPrice={tokenData.tokenPrice}
                    />
                  </div>
                  <div className="function-card">
                    <h2>Burn Credits</h2>
                    <BurnCreditsForm
                      onBurnCredits={handleBurnCredits}
                      loading={loading}
                      balance={tokenData.balance}
                      symbol={tokenData.symbol}
                    />
                  </div>
                </div>
              )}

              {activeTab === "marketplace" && (
                <MarketplaceSection
                  contract={contract}
                  account={account}
                  onListForSale={handleListForSale}
                  onBuyFromMarket={handleBuyFromMarket}
                  loading={loading}
                  balance={tokenData.balance}
                  symbol={tokenData.symbol}
                />
              )}

              {activeTab === "history" && <TransactionHistory transactions={transactions} />}

              {activeTab === "admin" && isOwner && (
                <div className="function-card">
                  <h2>Admin Functions</h2>
                  <div className="admin-actions">
                    <div className="admin-action">
                      <h3>Withdraw Contract Funds</h3>
                      <p>Withdraw all ETH from the contract to the owner address.</p>
                      <button onClick={handleWithdrawFunds} disabled={loading} className="admin-button">
                        {loading ? "Processing..." : "Withdraw Funds"}
                      </button>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        )}
      </main>
    </div>
  )
}

export default ContractInterface

