import { Web3Storage, File } from 'web3.storage';

// Function to get your API token
function getAccessToken(): string {
  // Replace this with your Web3.Storage API token
  return 'YOUR_API_TOKEN';
}

// Create a Web3.Storage client
function makeStorageClient(): Web3Storage {
  return new Web3Storage({ token: getAccessToken() });
}

// Function to store a JSON file on IPFS
async function storeJsonFile(): Promise<string> {
  // Create a JSON object to be uploaded
  const jsonObject = {
    sender: "alice",
    message: "Hello, world!",
  };

  // Convert the JSON object to a Blob
  const blob = new Blob([JSON.stringify(jsonObject)], { type: 'application/json' });

  // Create a File object from the Blob
  const file = new File([blob], "data.json");

  // Initialize the Web3.Storage client
  const client = makeStorageClient();

  // Upload the file to IPFS and get the CID (Content Identifier)
  const cid = await client.put([file]);
  console.log('Stored JSON file with CID:', cid);

  return cid;  // Return the CID to retrieve the file later
}

// Call the function to store the JSON file
storeJsonFile().then((cid) => {
  console.log('Your JSON file is now stored on IPFS with CID:', cid);
}).catch((error) => {
  console.error('Error uploading JSON file:', error);
});
