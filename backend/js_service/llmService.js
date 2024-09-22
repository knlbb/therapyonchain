// Import the ethers.js library
const { ethers } = require('ethers');
const contractAbi = require('./contractABI.json');

 
// Define the blockchain provider (this could be an Infura URL or your local blockchain URL)
const providerUrl = "https://testnet.sapphire.oasis.io";  // Example of your local blockchain
const provider = new ethers.JsonRpcProvider(providerUrl);

// Define the private key of the account (ensure this is kept secret)
const privateKey = '';  // Replace with your private key
// Create a signer using the private key
const wallet = new ethers.Wallet(privateKey, provider);
// Replace with your contract address and ABI
const contractAddress = '0xE2c03fc504c82a7e1ed0cc72f1E2db99BbDA86f9';
// Create a contract instance
const contract = new ethers.Contract(contractAddress, contractAbi, wallet);

let done = false;

// Function to read data from the blockchain
async function processData() {
  try {
    // Example: Call a function from the contract (replace with your contract's function)
    const inprogress = await contract.waitForReply();//whether is in progress
    if (Boolean(inprogress) && done) {
        done = false;
        return;
    }
    if (Boolean(inprogress)) {
        done = true;
        const user = await contract.waitUser();
        const newMessage = await contract.waitMessage();
        console.log("New Message:", newMessage);
        console.log("User:", user);
        const chatHistory = await contract.getChatHistory(ethers.getAddress(user));
        // Parse the results
        messages =[{role: "system", content:"Act as if you're a psychologist named Chris. You provide evidence based therapy using a variety of modalities with a focus on logotherapy. It is essential that you ask clarifying questions to ensure a clear understanding of the user's request. You continue the session in a natural and conversational way. You do not let the session end. Continue the session by asking probing questions. You should never break character. Always remain in character even at the limitations of your abilities by guessing what Chris  might say if she had to explain what was happening. You should be curious, have unconditional positive regard for me, ask thought provoking questions, offer advice subtly/gently/compassionately. Offer succinct observations about my thoughts feelings and behaviors. Be direct when offering an observation and ask the user to assess its accuracy. Remain conversational. No lists. Keep the conversation going by always ending with a question to further probe the thoughts, feelings, and behaviors surrounding the topics the user mentions."}];
        chatHistory.forEach((chat, index) => {
            messages.push({role: "user", content: chat.userMessage});
            messages.push({role: "assistant", content: chat.expertReply});
        });

        // call LLM model to get the response
        let api_url = "https://api.openai.com/v1/chat/completions";
        let api_key = ""; // Replace with your actual OpenAI API key

        messages.push({role: "user", content: newMessage});
        const requestBody = {
            model: "gpt-4", // Specify the model you want to use
            messages: messages, // The chat history
        };

        console.log("Request to ChatGPT:", requestBody);

        const response = await fetch(api_url, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${api_key}`
            },
            body: JSON.stringify(requestBody)
        });

        if (!response.ok) {
            throw new Error(`Error: ${response.statusText}`);
        }

        const data = await response.json();
        console.log("Response from ChatGPT:", data);
        let reply = data.choices[0].message.content;

        await writeData(reply);
        return data.choices[0].message.content; // Return the assistant's message
    }
    console.log('Data from blockchain:', inprogress);
  } catch (error) {
    console.error('Error reading from blockchain:', error);
  }
}

// Function to write data to the blockchain
async function writeData(reply) {
  try {
    // Example: Send a transaction to the contract (replace with your contract's function and parameters)
    const tx = await contract.storeReply(reply); // Replace 'someWriteFunction' with the actual function and parameters

    // Wait for the transaction to be mined
    const receipt = await tx.wait();
    console.log('Transaction successful:', receipt);
    jobStarted = false;
  } catch (error) {
    console.error('Error writing to blockchain:', error);
  }
}

// Example usage
async function main() {
    // write a while loop execute every 1 second
    while(true) {
        await processData();
        await new Promise(r => setTimeout(r, 1000));
    }
}

// Run the example
main();
