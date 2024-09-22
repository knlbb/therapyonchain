use oasis_runtime_sdk::modules::rofl::app::prelude::*;
use serde_json::json;
use std::sync::{Arc, Mutex};
use std::collections::HashMap;

const BLOCKCHAIN_MESSAGE_KEY: &str = "message"; // Replace with the actual key for the message in your blockchain.
const EXPERTCHAT_CONTRACT_ADDRESS: &str = "0xYourOracleContractAddress"; // Replace with your contract address.

struct ExpertChatApp {
    chat_history: Arc<ChatHistory>, // Shared chat history
}

#[async_trait]
impl App for ExpertChatApp {
    /// Application version.
    const VERSION: Version = sdk::version_from_cargo!();

    /// Identifier of the application (used for registrations).
    // #region app-id
    fn id() -> AppId {
        "rofl1qqn9xndja7e2pnxhttktmecvwzz0yqwxsquqyxdf".into() // Replace with your actual application ID.
    }
    // #endregion app-id

    /// Return the consensus layer trust root for this runtime; if `None`, consensus layer integrity
    /// verification will not be performed (e.g. Localnet).
    // #region consensus-trust-root
    fn consensus_trust_root() -> Option<TrustRoot> {
        // Modify the trust root as needed, or leave it as `None` if no specific trust root is required.
        None
    }
    // #endregion consensus-trust-root

    /// This function is executed once when the runtime starts.
    async fn run(self: Arc<Self>, _env: Environment<Self>) {
        // We are running now!
        println!("Hello ExpertChat world!");
    }

    /// This gets called for each runtime block.
    async fn on_runtime_block(self: Arc<Self>, env: Environment<Self>, _round: u64) {
        // This is where the main logic of processing blockchain blocks happens.
        // Calls the run_oracle method in case it fails, logs the error.
        
        if let Err(err) = self.check_and_read_from_smart_contract(env).await {
            println!("Failed to check and process message: {:?}", err);
        }
    }
}

impl ExpertChatApp {
    pub fn new() -> Self {
        Self {
            chat_history: Arc::new(ChatHistory::new()), // Initialize an empty chat history
        }
    }

    // /// Fetch data from blockchain, send it to ChatGPT, and write the response back to the blockchain.
    // async fn run_oracle(self: Arc<Self>, env: Environment<Self>) -> Result<()> {
    //     // Fetch message from the blockchain.
    //     let message = self.fetch_message_from_blockchain(env.clone()).await?;
        
    //     // Send the message to ChatGPT and get a response.
    //     let chatgpt_response = self.send_message_to_chatgpt(message).await?;

    //     // Write ChatGPT's response back to the blockchain.
    //     self.write_response_to_blockchain(env.clone(), chatgpt_response).await?;

    //     Ok(())
    // }
    
    async fn check_and_read_from_smart_contract(self: Arc<Self>, env: Environment<Self>) -> Result<()> {
        // Step 1: Specify the smart contract address
        let contract_address = "0xe7f1725E7734CE288F8367e1Bb143E90bb3F0512".to_string(); // Replace with the actual contract address
    
        // Access the client from the environment
        let client = env.client();

        // Query the blockchain using client.query
        let is_active: bool = client.query(0, "waitForReply", []).await?;
    
        // Step 3: If the flag is true, proceed to read the message and user
        if is_active {
            let message: String = client.query(0, "waitMessage", []).await?;

            let user: String = client.query(0, "waitUser", []).await?;
    
            println!("Message from blockchain: {}", message);
            println!("User from blockchain: {}", user);
    
            // Process the message and user
            self.process_message_from_blockchain(message, user).await?;
        } else {
            println!("Smart contract condition is not active.");
        }
    
        Ok(())
    }


    /// Fetches the message from the blockchain.
    async fn fetch_message_from_blockchain(self: Arc<Self>, env: Environment<Self>) -> Result<String> {
        let client = env.client();
        let round = client.latest_round().await?;

        // Simulating the retrieval of a message from the blockchain.
        let message: String = client
            .query(round, "getMessage", BLOCKCHAIN_MESSAGE_KEY.to_string())
            .await?;

        println!("Fetched message from blockchain: {}", message);
        Ok(message)
    }

    // async fn test(self: Arc<Self>, env: Environment<Self>) -> Result<String> {
        
    //     let contract_address = "0xe7f1725E7734CE288F8367e1Bb143E90bb3F0512".to_string(); // Replace with the actual contract address
    //     // Access the client from the environment
    //     let client = env.client();
    //     let message: String = client.query(0, "waitMessage", []).await?;
    //     let user: String = client.query(0, "waitUser", []).await?;
    
    //     println!("Message from blockchain: {}", message);
    //     println!("User from blockchain: {}", user);
    // }

    async fn process_message_from_blockchain(self: Arc<Self>, message: String, user: String) -> Result<String> {
        let api_url = "https://api.openai.com/v1/chat/completions";
        let api_key = "xxx"; // Replace with your actual OpenAI API key

        // Add the new user message to the conversation history.
        self.chat_history.add_user_message(user.clone(), message.clone());

        // Retrieve the full conversation history.
        let conversation_history = self.chat_history.get_history(user.clone());

        println!("ChatGPT message: {}", message);

        // Prepare the request payload with the full conversation history.
        let request_body = json!({
            "model": "gpt-4",
            "messages": conversation_history,
            "max_tokens": 100
        });

        // Create an HTTP client
        let agent = rofl_utils::https::agent();
        let reply = tokio::task::spawn_blocking(move || -> Result<_> {
            // Step 1: Send the POST request
            let mut response = agent
                .post(api_url)
                .header("Authorization", format!("Bearer {}", api_key))
                .content_type("application/json")
                .send(serde_json::to_string(&request_body).unwrap())
                .unwrap();

            // Step 2: Verify the response status
            assert_eq!(response.status(), 200);

            // Step 3: Read and verify the response body
            let mut response_body = response.body_mut().read_to_string().unwrap();

            let json_response: serde_json::Value = serde_json::from_str(&response_body).unwrap();
            let assistant_reply = json_response["choices"][0]["message"]["content"]
                .as_str()
                .ok_or(anyhow::anyhow!("Invalid ChatGPT response"))?
                .to_string();
            Ok(assistant_reply)
        }).await??;

        // Add the assistant's reply to the conversation history.
        self.chat_history.add_assistant_message(user.clone(), reply.clone());

        println!("ChatGPT reply: {}", reply);

        // Return the assistant's reply.
        Ok(reply)
    }


    /// Writes ChatGPT's response back to the blockchain.
    async fn write_response_to_blockchain(self: Arc<Self>, env: Environment<Self>, response: String) -> Result<()> {
        // Simulating writing a response back to the blockchain.
        println!("Writing ChatGPT response to blockchain: {}", response);

        // Define the contract function signature: storeReply(string)
        let function_signature = "storeReply(string)";
        
        // Encode the function selector and arguments.
        let encoded_data = [
            ethabi::short_signature(function_signature, &[ethabi::ParamType::String]).to_vec(),
            ethabi::encode(&[ethabi::Token::String(response)]),
        ]
        .concat();

        let mut tx = self.new_transaction(
            "evm.Call",
            module_evm::types::Call {
                address: EXPERTCHAT_CONTRACT_ADDRESS.parse().unwrap(),
                value: 0.into(),
                data: encoded_data,
            },
        );
        tx.set_fee_gas(200_000);

        env.client().sign_and_submit_tx(env.signer(), tx).await?;
        Ok(())
    }
}

struct ChatHistory {
    // A mapping of user IDs to their conversation histories
    histories: Mutex<HashMap<String, Vec<serde_json::Value>>>,
}

impl ChatHistory {
    // Initialize the ChatHistory with an empty map for all users.
    pub fn new() -> Self {
        Self {
            histories: Mutex::new(HashMap::new()), // Start with an empty conversation history map
        }
    }

    // Add a user message to the conversation history for a specific user.
    pub fn add_user_message(&self, user_id: String, message: String) {
        let mut histories = self.histories.lock().unwrap();
        let history = histories.entry(user_id.clone()).or_insert_with(Vec::new);
        history.push(json!({
            "role": "user",
            "content": message
        }));
        println!("Added user message for user: {}", user_id);
    }

    // Add an assistant message to the conversation history for a specific user.
    pub fn add_assistant_message(&self, user_id: String, message: String) {
        let mut histories = self.histories.lock().unwrap();
        let history = histories.entry(user_id.clone()).or_insert_with(Vec::new);
        history.push(json!({
            "role": "assistant",
            "content": message
        }));
        println!("Added assistant message for user: {}", user_id);
    }

    // Retrieve the conversation history for a specific user.
    pub fn get_history(&self, user_id: String) -> Vec<serde_json::Value> {
        let histories = self.histories.lock().unwrap();
        histories.get(&user_id).cloned().unwrap_or_else(Vec::new)
    }
}

#[tokio::main]
async fn main() -> Result<()> {
    // Initialize the ExpertChat instance.
    let expert_chat = Arc::new(ExpertChatApp::new());

    // Example user message to send to ChatGPT.
    let user_message = "Hi I feel exhausted today but pumped up.".to_string();

    // Send the message to ChatGPT and get the response.
    let chatgpt_response = expert_chat
        .clone()
        .process_message_from_blockchain(user_message, "user123".to_string())
        .await?;

    Ok(())
}

// fn main() {
//     let app = ExpertChatApp {
//         chat_history: Arc::new(ChatHistory::new()),
//     };
//     app.start();
// }
