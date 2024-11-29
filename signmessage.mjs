// signMessage.ts
import { ethers } from "ethers";
import * as dotenv from "dotenv";
dotenv.config();

const run = async () => {
  try {
    // 1. Connect to a wallet (using a private key for testing)
    const privateKey = process.env.PRIVATE_KEY;
    const wallet = new ethers.Wallet(privateKey);

    // 2. Generate the message to be signed (same format used for authentication)
    const message = `Sign this message to authenticate: ${new Date().toISOString()}`;
    console.log("Message to sign:", message);

    // 3. Sign the message
    const signature = await wallet.signMessage(message);
    console.log("Signature:", signature);

    // 4. Output the address, message, and signature
    console.log("Wallet Address:", wallet.address);
  } catch (error) {
    console.error("Error signing message:", error);
  }
};

run();
