import { bech32 } from "bech32";
import { task } from 'hardhat/config';
import { ethers } from "hardhat";

task("deploy", "Deploy the ROFL contract")
  .addPositionalParam("roflAppID", "your app ID")
  .setAction(async ({ roflAppID }, hre) => {

    // TODO: Move below to a ROFL helper library (@oasisprotocol/rofl).
    // const rawAppID = rofl.parseAppID(roflAppID);

    const {prefix, words} = bech32.decode(roflAppID);
    if (prefix !== "rofl") {
      throw new Error(`Malformed ROFL app identifier: ${roflAppID}`);
    }
    const rawAppID = new Uint8Array(bech32.fromWords(words));

    // Deploy a new instance of the expert contract configuring the ROFL app that is
    // allowed to submit observations and the number of app instances required.
    const expert = await hre.ethers.deployContract("ExpertChat", [rawAppID], {});
    //0x5FbDB2315678afecb367f032d93F642f64180aa3

    await expert.waitForDeployment();

    console.log(`ExpertChat for ROFL app ${roflAppID} deployed to ${expert.target}`);
  });

task("expert-query", "Queries the expert contract")
  .addPositionalParam("contractAddress", "The deployed contract address")
  .setAction(async ({ contractAddress }, { ethers }) => {
    const expert = await ethers.getContractAt("ExpertChat", contractAddress);

    console.log(`Using expert contract deployed at ${expert.target}`);

    const status = await expert.waitForReply();
    console.log(`status: ${status.toString()}`);

    try {
      await expert.chatWithExpert("hello my friend");
      const message = await expert.waitMessage();
      console.log(`Last observation: ${message.toString()}`);
      await expert.storeReply("Hello my friend, how can I help you?");
      const status = await expert.waitForReply();
      console.log(`status: ${status.toString()}`);
      // Call the getChatHistory function
      const chatHistory = await expert.getChatHistory(ethers.getAddress("0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266"));

      // Parse the results
      chatHistory.forEach((chat, index) => {
          console.log(`Chat ${index + 1}:`);
          console.log(`User Message: ${chat.userMessage}`);
          console.log(`Expert Reply: ${chat.expertReply}`);
      });

    } catch {
      console.log(`No last observation available.`);
    }
  });
