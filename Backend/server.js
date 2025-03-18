require('dotenv').config();
const express = require('express');
const { ethers } = require('ethers');
const { Pool } = require('pg');

const app = express();
app.use(express.json());

// ✅ PostgreSQL Connection
const pool = new Pool({ connectionString: process.env.DATABASE_URL });

// ✅ Ethereum Connection
const provider = new ethers.JsonRpcProvider(`https://sepolia.infura.io/v3/${process.env.INFURA_API_KEY}`);
const wallet = new ethers.Wallet(process.env.PRIVATE_KEY, provider);

// ✅ Smart Contract Address & ABI
const contractAddress = process.env.CONTRACT_ADDRESS;
const contractABI = require('./CarbonCreditTokenABI.json');
const contract = new ethers.Contract(contractAddress, contractABI, wallet);

// ✅ Buy Credits (Store in Database)
app.post('/buy', async (req, res) => {
    const { user_address, amount } = req.body;

    try {
        // 🔹 Blockchain Transaction
        const tx = await contract.buyCredits(amount, { value: ethers.parseEther((amount * 0.001).toString()) });
        await tx.wait();

        // 🔹 Store in Database
        await pool.query(
            "INSERT INTO transactions (user_address, amount, type) VALUES ($1, $2, 'buy')",
            [user_address, amount]
        );

        res.json({ success: true, txHash: tx.hash });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Transaction failed' });
    }
});

// ✅ Burn Credits
app.post('/burn', async (req, res) => {
    const { user_address, amount } = req.body;

    try {
        // 🔹 Blockchain Transaction
        const tx = await contract.burnCredits(amount);
        await tx.wait();

        // 🔹 Store in Database
        await pool.query(
            "INSERT INTO transactions (user_address, amount, type) VALUES ($1, $2, 'burn')",
            [user_address, amount]
        );

        res.json({ success: true, txHash: tx.hash });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Transaction failed' });
    }
});

// ✅ Get User Transactions
app.get('/transactions/:user', async (req, res) => {
    const { user } = req.params;
    const result = await pool.query("SELECT * FROM transactions WHERE user_address = $1", [user]);
    res.json(result.rows);
});

// ✅ Start Server
app.listen(3000, () => console.log('Server running on port 3000'));
