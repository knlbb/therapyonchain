// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

// TODO add subCall for authorized access

contract ExpertChat {

    // Configuration.
    bytes21 public roflAppID;

    // Struct to store message and reply details
    struct Chat {
        string userMessage;
        string expertReply;
    }

    // Mapping to store chat history for each user
    mapping(address => Chat[]) private chatHistory;

    bool public waitForReply;
    string public waitMessage;
    address public waitUser;
    uint public waitMessageIndex;
    string public repliedMessage;

    // Event to notify when a reply is stored
    event ReplyStored(address indexed user, uint messageIndex, string reply);

    constructor(bytes21 _roflAppID) {
        roflAppID = _roflAppID;
        waitForReply = false;
        waitMessage = "";
        waitUser = address(0);
        waitMessageIndex = 0;
    }

    // Function to store a message from the user
    function chatWithExpert(string memory message) public {
        // Store the user's message, create a new Chat struct and push it to the user's chat history
        chatHistory[msg.sender].push(Chat({
            userMessage: message,
            expertReply: ""  // Reply will be empty until the expert replies
        }));
        waitForReply = true;
        waitMessage = message;
        waitUser = msg.sender;
        waitMessageIndex = chatHistory[msg.sender].length - 1;
    }

    // Function to store the expert's reply and emit an event
    function storeReply(string memory reply) public {
        require(waitMessageIndex < chatHistory[waitUser].length, "Invalid message index");

        // Store the expert's reply for the specified message
        chatHistory[waitUser][waitMessageIndex].expertReply = reply;

        // Emit an event to notify that the reply has been stored
        emit ReplyStored(waitUser, waitMessageIndex, reply);
        repliedMessage = reply;
        waitForReply = false;
    }

    // Function to get the entire chat history for a user (off-chain readable)
    function getChatHistory(address user) public view returns (Chat[] memory) {
        return chatHistory[user];
    }

    // Function to get a specific message-reply pair by index for a user
    function getChatByIndex(address user, uint index) public view returns (string memory userMessage, string memory expertReply) {
        require(index < chatHistory[user].length, "Invalid index");
        Chat memory chat = chatHistory[user][index];
        return (chat.userMessage, chat.expertReply);
    }
}

