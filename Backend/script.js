require('dotenv').config();
const { ethers } = require("ethers");

// ✅ Load environment variables
const PRIVATE_KEY = process.env.PRIVATE_KEY; 
const INFURA_URL = process.env.INFURA_URL;  // Or ALCHEMY_URL if using Alchemy
const CONTRACT_ADDRESS = process.env.CONTRACT_ADDRESS;

// ✅ Import your contract ABI
const contractABI = require("./CarbonCreditTokenABI.json");

// ✅ Connect to the Ethereum network
const provider = new ethers.JsonRpcProvider(INFURA_URL);
const wallet = new ethers.Wallet(PRIVATE_KEY, provider);
const contract = new ethers.Contract(CONTRACT_ADDRESS, contractABI, wallet);

async function testBuyCredits() {
    try {
        console.log("🔹 Sending transaction...");
        
        // ✅ Send transaction (buy 1 credit)
        const tx = await contract.buyCredits(1, { value: ethers.parseEther("0.001") });
        await tx.wait();

        console.log("✅ Transaction successful! Hash:", tx.hash);
    } catch (error) {
        console.error("❌ Transaction failed:", error);
    }
}

// ✅ Run the function
testBuyCredits();
