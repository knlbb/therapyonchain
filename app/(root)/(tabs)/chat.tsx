import { Text, TextInput, TouchableOpacity, View, Image, TouchableWithoutFeedback, KeyboardAvoidingView, Platform, Keyboard, ScrollView, Modal, Pressable} from "react-native"
import { SafeAreaView } from "react-native-safe-area-context"
import * as Speech from 'expo-speech';
import { useEffect, useState, useRef, useContext } from "react";
import { router } from "expo-router";
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import FontAwesome5 from '@expo/vector-icons/FontAwesome5';
import { Audio } from 'expo-av';
import * as Permissions from 'expo-permissions';
import axios from 'axios';
import { LogBox } from 'react-native';
import { useSessionContext } from '../../session';
LogBox.ignoreAllLogs(true);  // Disable yellow warning boxes
import { keccak256 } from 'ethers'; // ethers can be used for this
import {  ethers} from 'ethers';
import { createPublicClient, http } from 'viem';
import { oasisTestnet } from 'viem/chains';
import { client } from "@/components/dynamicClient";
import { useReactiveClient } from "@dynamic-labs/react-hooks";
import { defineChain, parseAbi } from 'viem'
import { JsonRpcProvider } from 'ethers';




interface Message {
  id: number;
  text: string;
  sender: 'me' | 'other';  // To differentiate between sent and received messages
}

export const NyxChain = defineChain({
  id: 0x5afd, // This is the chain ID in hexadecimal (24061 in decimal)
  name: 'NyxChain',
  network: 'nyx', // A short identifier for the network (optional but recommended)
  nativeCurrency: {
    decimals: 18,
    name: 'Oasis Test',
    symbol: 'OATEST',
  },
  rpcUrls: {
    default: {
      http: ['http://47.236.76.246:8545'], // Your local blockchain URL
    },
  },
  blockExplorers: {
    default: {
      name: 'NyxChain Explorer',
      url: '', // Optional block explorer URL, leave blank or remove if none
    },
  },
});

import Web3 from 'web3';

const Chat = () => {
  // const web3 = require('web3');
  const web3 = new Web3();
  
  const { auth, wallets } = useReactiveClient(client);

  
  const [sessionId, setSessionId] = useState<string | null>(null);
  const [messages, setMessages] = useState<Message[]>([]);

  useEffect(() => {
    console.log(sessionId);
  }, [sessionId]);

  // Simulate receiving a message
  const receiveMessage = (text: string) => {
    const newMessage: Message = {
      id: messages.length + 1,
      text,
      sender: 'other',  // 'other' for received messages
    };
    setMessages(oldmessages => [...oldmessages, newMessage])
    playSound(text)
  };

  // Send a message
  const sendMessage = async () => {
    console.log("msg", messageToGPT);
    
    // const ethers = require('ethers');
    // const provider = new ethers.providers.JsonRpcProvider('https://testnet.sapphire.oasis.dev/');
    const provider = new JsonRpcProvider('https://testnet.sapphire.oasis.dev/');

      const newMessage: Message = {
        id: messages.length + 1,
        text: messageToGPT,
        sender: 'me',  // 'me' for sent messages
      };
      setMessages(oldmessages => [...oldmessages, newMessage])

      // const { primaryWallet } = useDynamicContext()

      // const provider = new ethers.providers.JsonRpcProvider('https://testnet.sapphire.oasis.dev/');

      const privateKey = '0xacb3b27dc4b61dfd6f59bd3ebec6af1b0cf3ac76e41b4c036d7ebbcd5be8f619';
      const wallet = new ethers.Wallet(privateKey, provider);

      const contractAddress = '0xE2c03fc504c82a7e1ed0cc72f1E2db99BbDA86f9';
      console.log("contractABI")
      const contractABI = [
        {
          "inputs": [
            {
              "internalType": "bytes21",
              "name": "_roflAppID",
              "type": "bytes21"
            }
          ],
          "stateMutability": "nonpayable",
          "type": "constructor"
        },
        {
          "anonymous": false,
          "inputs": [
            {
              "indexed": true,
              "internalType": "address",
              "name": "user",
              "type": "address"
            },
            {
              "indexed": false,
              "internalType": "uint256",
              "name": "messageIndex",
              "type": "uint256"
            },
            {
              "indexed": false,
              "internalType": "string",
              "name": "reply",
              "type": "string"
            }
          ],
          "name": "ReplyStored",
          "type": "event"
        },
        {
          "inputs": [
            {
              "internalType": "string",
              "name": "message",
              "type": "string"
            }
          ],
          "name": "chatWithExpert",
          "outputs": [],
          "stateMutability": "nonpayable",
          "type": "function"
        },
        {
          "inputs": [
            {
              "internalType": "address",
              "name": "user",
              "type": "address"
            },
            {
              "internalType": "uint256",
              "name": "index",
              "type": "uint256"
            }
          ],
          "name": "getChatByIndex",
          "outputs": [
            {
              "internalType": "string",
              "name": "userMessage",
              "type": "string"
            },
            {
              "internalType": "string",
              "name": "expertReply",
              "type": "string"
            }
          ],
          "stateMutability": "view",
          "type": "function"
        },
        {
          "inputs": [
            {
              "internalType": "address",
              "name": "user",
              "type": "address"
            }
          ],
          "name": "getChatHistory",
          "outputs": [
            {
              "components": [
                {
                  "internalType": "string",
                  "name": "userMessage",
                  "type": "string"
                },
                {
                  "internalType": "string",
                  "name": "expertReply",
                  "type": "string"
                }
              ],
              "internalType": "struct ExpertChat.Chat[]",
              "name": "",
              "type": "tuple[]"
            }
          ],
          "stateMutability": "view",
          "type": "function"
        },
        {
          "inputs": [],
          "name": "repliedMessage",
          "outputs": [
            {
              "internalType": "string",
              "name": "",
              "type": "string"
            }
          ],
          "stateMutability": "view",
          "type": "function"
        },
        {
          "inputs": [],
          "name": "roflAppID",
          "outputs": [
            {
              "internalType": "bytes21",
              "name": "",
              "type": "bytes21"
            }
          ],
          "stateMutability": "view",
          "type": "function"
        },
        {
          "inputs": [
            {
              "internalType": "string",
              "name": "reply",
              "type": "string"
            }
          ],
          "name": "storeReply",
          "outputs": [],
          "stateMutability": "nonpayable",
          "type": "function"
        },
        {
          "inputs": [],
          "name": "waitForReply",
          "outputs": [
            {
              "internalType": "bool",
              "name": "",
              "type": "bool"
            }
          ],
          "stateMutability": "view",
          "type": "function"
        },
        {
          "inputs": [],
          "name": "waitMessage",
          "outputs": [
            {
              "internalType": "string",
              "name": "",
              "type": "string"
            }
          ],
          "stateMutability": "view",
          "type": "function"
        },
        {
          "inputs": [],
          "name": "waitMessageIndex",
          "outputs": [
            {
              "internalType": "uint256",
              "name": "",
              "type": "uint256"
            }
          ],
          "stateMutability": "view",
          "type": "function"
        },
        {
          "inputs": [],
          "name": "waitUser",
          "outputs": [
            {
              "internalType": "address",
              "name": "",
              "type": "address"
            }
          ],
          "stateMutability": "view",
          "type": "function"
        }
      ]

      const contract = new ethers.Contract(contractAddress, contractABI, wallet);

      console.log("contractABI", contractABI)
      

      // const result = await contract.chatWithExpert(messageToGPT); // Fetch contract data
      // console.log(JSON.stringify(result, null, 2));

      const tx = await contract.chatWithExpert(messageToGPT); // Replace with actual function and args
      await tx.wait();  // Wait for the transaction to be mined
      console.log('Transaction successful:', tx.hash);

      
      // if (!(await contract.waitForReply())) {
      //   console.log(
      //    await contract.repliedMessage());
      // }  

      const intervalId = setInterval(async () => {
        if (!(await contract.waitForReply())) {
          const newMsg = await contract.repliedMessage()
          receiveMessage(newMsg)
          clearInterval(intervalId); // Stop checking once the condition is met
        }
      }, 1000); // Run every 1 second (1000 milliseconds)

      // const chatHistory = await contract.getChatHistory(ethers.getAddress(wallet.address));
      //   // Parse the results
        
      //   chatHistory.forEach((chat:any, index:any) => {
      //       messages.push({role: "user", content: chat.userMessage});
      //       messages.push({role: "assistant", content: chat.expertReply});
      //   });



      // wallets.setPrimary({ walletId: wallets.userWallets[0].id })

      // if (primaryWallet) {
      //   const provider = await getWeb3Provider(primaryWallet)
      //   const signer = await getSigner(primaryWallet)

      //   const contractABI = {
      //     "inputs": [
      //       {
      //         "internalType": "string",
      //         "name": "message",
      //         "type": "string"
      //       }
      //     ],
      //     "name": "chatWithExpert",
      //     "outputs": [],
      //     "stateMutability": "nonpayable",
      //     "type": "function"
      //   }
      //   // Define the contract address
      //   const contractAddress = '0x5a7095175AfbDD4F3736be7f8D846345c09d2D75' // Replace with your actual contract address

      //   // Create the contract instance
      //   const contract = new ethers.Contract(contractAddress, [contractABI], signer);

      //   // Use provider and signer here
      //   console.log('Provider, signer, and contract obtained successfully');

      //   try {

      //     const tx = await contract.chatWithExpert(messageToGPT); // This will send the transaction to the blockchain
      //     console.log("Transaction Hash:", tx.hash);
      
      //     // Wait for the transaction to be mined (optional, can be awaited)
      //     await tx.wait();

      //     const messageWritten = await contract.waitMessage();
      //     console.log("Message written: ", messageWritten.toString())

      //   } catch (error) {
      //     console.error("Error writing to contract:", error);
      //   }
        
      //   // You can now interact with the contract, for example:
      //   // await contract.chatWithExpert(messageToGPT);
      // } else {
      //   console.error('No primary wallet available')
      // }

      // handleSubmit(messageToGPT)
      // const functionSignature = 'chatWithExpert(string)';
    // const functionSelector = ethers.keccak256(ethers.toUtf8Bytes(functionSignature)).slice(0, 10); // First 4 bytes (8 hex chars)
    
    // console.log("fcn select", functionSelector); // Should output: 0xa9059cbb

    // const encodedParams = defaultAbiCoder.encode(['string'], [messageToGPT]);

    // const abiCoder = new ethers.AbiCoder();
    // const encodedParams = abiCoder.encode(
    //   ['string'],
    //   [messageToGPT]
    // );

    // console.log("encoded param",encodedParams); // Encoded parameters in hex

    // const data = functionSelector + encodedParams.slice(2); // Combine selector and params, removing "0x" from params
    // console.log(" data",data); // This is the full `data` to send in the transaction

    // const client = createWalletClient({
    //   chain: mainnet,
    //   transport: http('https://your.rpc.url')
    // });
    // console.log("user wallet", auth.authenticatedUser?.verifiedCredentials[0].address);
    // console.log("wallets.userWallets[0]", wallets.userWallets[0]);
    
    // const publicViemClient = client.viem.createPublicClient({ chain: oasisTestnet })
    // const lookupBalance = (address: `0x${string}`) => {
    //   console.log("address", address)
    //   publicViemClient.getBalance({ address });
    // }
      

    // let balance = lookupBalance(auth.authenticatedUser?.verifiedCredentials[0].address as `0x${string}`)
    // console.log("balance", balance)

    // const walletClient = client.wallets.primary && client.viem.createWalletClient({
    //   wallet: client.wallets.primary,
    //   chain: oasisTestnet
    // })

    // const functionAbi = [{
    //   name: 'chatWithExpert',
    //   type: 'function',
    //   inputs: [
    //     {
    //       type: 'string',
    //       name: 'messageToGPT',
    //     },
    //   ],
    // }];

    // if (!walletClient) {
    //   console.error('Wallet client is undefined');
    //   return;
    // }

    // const [account] = await walletClient.getAddresses();

    // console.log("account", account);

    // try {
    //   walletClient.writeContract({
    //     address: "0x5a7095175AfbDD4F3736be7f8D846345c09d2D75",
    //     abi: functionAbi,
    //     functionName: 'chatWithExpert',
    //     args: [messageToGPT],
    //     account
    //   }).then((res) => console.log('tx',res))
    // } catch (err) {
    //   console.log('tx,err',err)
    // }

    // // Send the transaction
    // const tx = await walletClient.sendTransaction({
    //   to: '0x5FbDB2315678afecb367f032d93F642f64180aa3',
    //   data: data as `0x${string}`, // The data payload from the encoding above
    //   value: 0n, // If no ETH is being sent with the transaction
    // }).then((res) => console.log('tx',res))
    // .catch((err) => console.log('tx,err',err))
    
    // console.log('Transaction hash:', tx);
  };

  const [messageToGPT, setMessageToGPT] = useState('');


  const handleSubmit = async (msg:string) => {

    if (messageToGPT !== ''){
      msg = messageToGPT
    }
    
    try {
      // Send a POST request to the server using Axios
        const response = await axios.post('http://10.51.4.159:8080/api/data', {message: msg}, {
          headers: {
            'Content-Type': 'application/json',
          },
        });
          receiveMessage(response.data["response"])
          playSound(response.data["response"])
      } catch (error) {
        console.error('Error sending data to the server:', error);
      }
  };

  const handleChange = (text: string) => {
    setMessageToGPT(text)
  };

  const API_KEY = 'AIzaSyCJg9yMlWWLxzBV-Pga7C-WzVSMjeBOAqY'; 

  async function synthesizeSpeech(text: any) {
    const url = `https://texttospeech.googleapis.com/v1/text:synthesize?key=${API_KEY}`;

    const requestBody = {
      input: { text: text },
      voice: { languageCode: 'en-US', name: "en-US-Casual-K" },
      audioConfig: { audioEncoding: 'MP3' },
    };

    try {
      const response = await axios.post(url, requestBody, {
        headers: { 'Content-Type': 'application/json' },
      });
      return response.data.audioContent;
    } catch (error) {
      console.error('Error synthesizing speech:', error);
      throw error;
    }
  }

  const playSound = async (gptResponseToPlay: string) => {
    try {
      const audioContent = await synthesizeSpeech(gptResponseToPlay);
      const soundObject = new Audio.Sound();
      const audioUri = `data:audio/mp3;base64,${audioContent}`;

      await soundObject.loadAsync({ uri: audioUri });
      await soundObject.playAsync();
      // setSound(soundObject);
    } catch (error) {
      console.log('Error', 'Failed to play the audio');
    }
  };

  const [chatHistoryList, setchatHistoryList] = useState<string[]>([]);

  const addToChatHist = async (strMsg: string) => {
    await setchatHistoryList([...chatHistoryList, strMsg])
  }
  
  const [chatOrCall, setChatOrCall] = useState(true)


  const [call, setCall] = useState(false)

  function renderModal() {
    const [recording, setRecording] = useState();
    const [audioUri, setAudioUri] = useState('');

    useEffect(() => {
      // Request audio recording permissions
      (async () => {
        const { status } = await Permissions.askAsync(Permissions.AUDIO_RECORDING);
        if (status !== 'granted') {
          alert('Permission to access microphone is required!');
        }
      })();
    }, []);

    async function startRecording() {
      try {
        console.log('Requesting permissions..');
        await Audio.requestPermissionsAsync();
    
        console.log('Starting recording..');
        await Audio.setAudioModeAsync({
          allowsRecordingIOS: true,
          playsInSilentModeIOS: true,
        });
    
        const recording = new Audio.Recording();
        await recording.prepareToRecordAsync({
          android: {
            extension: '.wav',
            outputFormat: Audio.RECORDING_OPTION_ANDROID_OUTPUT_FORMAT_DEFAULT,
            audioEncoder: Audio.RECORDING_OPTION_ANDROID_AUDIO_ENCODER_DEFAULT,
            sampleRate: 16000, // Set to match Google's API requirements
            numberOfChannels: 1,
          },
          ios: {
            extension: '.wav',
            outputFormat: Audio.RECORDING_OPTION_IOS_OUTPUT_FORMAT_LINEARPCM,
            sampleRate: 16000, // Ensure this matches the API requirements
            numberOfChannels: 1,
          },
        });
        await recording.startAsync();
        setRecording(recording);
        console.log('Recording started');
      } catch (err) {
        console.error('Failed to start recording', err);
      }
    }

    async function stopRecording() {
      console.log('Stopping recording..');
      setRecording(undefined);
      await recording.stopAndUnloadAsync();
      const uri = recording.getURI();
      setAudioUri(uri);
      console.log('Recording stopped and stored at', uri);

      transcribeAudio(uri);
    }

    async function blobToBase64(blob: Blob) {
      return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.onloadend = () => resolve(reader.result.split(',')[1]); // Get base64 content
        reader.onerror = reject;
        reader.readAsDataURL(blob); // This reads the blob as a data URL, which includes the base64 data
      });
    }

  const GOOGLE_API_KEY = 'AIzaSyAl2FjujN9Xpx26E3YwIjeXUe9kuANEKe0';

  async function transcribeAudio(audioUri: string) {
    try {
      const response = await fetch(audioUri);
      const blob = await response.blob();
      const base64Audio = await blobToBase64(blob);
  
      const body = {
        config: {
          encoding: 'LINEAR16', // Adjust encoding if necessary
          sampleRateHertz: 16000, // Ensure the sample rate matches the recorded audio
          languageCode: 'en-US',
        },
        audio: {
          content: base64Audio,
        },
      };
  
      const result = await axios.post(
        `https://speech.googleapis.com/v1/speech:recognize?key=${GOOGLE_API_KEY}`,
        body,
        { headers: { 'Content-Type': 'application/json' } }
      );
  
      // Log the full response to see what's returned
      console.log('Google API Response:', result.data);
  
      if (result.data && result.data.results) {
        const transcription = result.data.results
          .map((result: { alternatives: { transcript: any; }[]; }) => result.alternatives[0].transcript)
          .join('\n');
        console.log('Transcription:', transcription);

        const newMessage: Message = {
          id: messages.length + 1,
          text: transcription,
          sender: 'me',  // 'me' for sent messages
        };
        setMessages(oldmessages => [...oldmessages, newMessage])
        // setMessageToGPT(transcription)
        // sendMessage()
        const provider = new JsonRpcProvider('https://testnet.sapphire.oasis.dev/');
        const privateKey = '0xacb3b27dc4b61dfd6f59bd3ebec6af1b0cf3ac76e41b4c036d7ebbcd5be8f619';
        const wallet = new ethers.Wallet(privateKey, provider);

        const contractAddress = '0xE2c03fc504c82a7e1ed0cc72f1E2db99BbDA86f9';
        console.log("contractABI")
        const contractABI = [
          {
            "inputs": [
              {
                "internalType": "bytes21",
                "name": "_roflAppID",
                "type": "bytes21"
              }
            ],
            "stateMutability": "nonpayable",
            "type": "constructor"
          },
          {
            "anonymous": false,
            "inputs": [
              {
                "indexed": true,
                "internalType": "address",
                "name": "user",
                "type": "address"
              },
              {
                "indexed": false,
                "internalType": "uint256",
                "name": "messageIndex",
                "type": "uint256"
              },
              {
                "indexed": false,
                "internalType": "string",
                "name": "reply",
                "type": "string"
              }
            ],
            "name": "ReplyStored",
            "type": "event"
          },
          {
            "inputs": [
              {
                "internalType": "string",
                "name": "message",
                "type": "string"
              }
            ],
            "name": "chatWithExpert",
            "outputs": [],
            "stateMutability": "nonpayable",
            "type": "function"
          },
          {
            "inputs": [
              {
                "internalType": "address",
                "name": "user",
                "type": "address"
              },
              {
                "internalType": "uint256",
                "name": "index",
                "type": "uint256"
              }
            ],
            "name": "getChatByIndex",
            "outputs": [
              {
                "internalType": "string",
                "name": "userMessage",
                "type": "string"
              },
              {
                "internalType": "string",
                "name": "expertReply",
                "type": "string"
              }
            ],
            "stateMutability": "view",
            "type": "function"
          },
          {
            "inputs": [
              {
                "internalType": "address",
                "name": "user",
                "type": "address"
              }
            ],
            "name": "getChatHistory",
            "outputs": [
              {
                "components": [
                  {
                    "internalType": "string",
                    "name": "userMessage",
                    "type": "string"
                  },
                  {
                    "internalType": "string",
                    "name": "expertReply",
                    "type": "string"
                  }
                ],
                "internalType": "struct ExpertChat.Chat[]",
                "name": "",
                "type": "tuple[]"
              }
            ],
            "stateMutability": "view",
            "type": "function"
          },
          {
            "inputs": [],
            "name": "repliedMessage",
            "outputs": [
              {
                "internalType": "string",
                "name": "",
                "type": "string"
              }
            ],
            "stateMutability": "view",
            "type": "function"
          },
          {
            "inputs": [],
            "name": "roflAppID",
            "outputs": [
              {
                "internalType": "bytes21",
                "name": "",
                "type": "bytes21"
              }
            ],
            "stateMutability": "view",
            "type": "function"
          },
          {
            "inputs": [
              {
                "internalType": "string",
                "name": "reply",
                "type": "string"
              }
            ],
            "name": "storeReply",
            "outputs": [],
            "stateMutability": "nonpayable",
            "type": "function"
          },
          {
            "inputs": [],
            "name": "waitForReply",
            "outputs": [
              {
                "internalType": "bool",
                "name": "",
                "type": "bool"
              }
            ],
            "stateMutability": "view",
            "type": "function"
          },
          {
            "inputs": [],
            "name": "waitMessage",
            "outputs": [
              {
                "internalType": "string",
                "name": "",
                "type": "string"
              }
            ],
            "stateMutability": "view",
            "type": "function"
          },
          {
            "inputs": [],
            "name": "waitMessageIndex",
            "outputs": [
              {
                "internalType": "uint256",
                "name": "",
                "type": "uint256"
              }
            ],
            "stateMutability": "view",
            "type": "function"
          },
          {
            "inputs": [],
            "name": "waitUser",
            "outputs": [
              {
                "internalType": "address",
                "name": "",
                "type": "address"
              }
            ],
            "stateMutability": "view",
            "type": "function"
          }
        ]

        const contract = new ethers.Contract(contractAddress, contractABI, wallet);

        console.log("contractABI", contractABI)
        

        // const result = await contract.chatWithExpert(messageToGPT); // Fetch contract data
        // console.log(JSON.stringify(result, null, 2));

        const tx = await contract.chatWithExpert(transcription); // Replace with actual function and args
        await tx.wait();  // Wait for the transaction to be mined
        console.log('Transaction successful:', tx.hash);

        
        // if (!(await contract.waitForReply())) {
        //   console.log(
        //    await contract.repliedMessage());
        // }  

        const intervalId = setInterval(async () => {
          if (!(await contract.waitForReply())) {
            const newMsg = await contract.repliedMessage()
            receiveMessage(newMsg)
            clearInterval(intervalId); // Stop checking once the condition is met
          }
        }, 1000); // Run every 1 second (1000 milliseconds)
        // handleSubmit(transcription)
      } else {
        console.log('No transcription found');
      }
    } catch (error) {
      console.error('Error transcribing audio:', error);
    }
  }
    
    const scrollViewRef = useRef()
    const [listening, setListen] = useState(false)
    const [processing, setProcess] = useState(false)
    return (
      <Modal visible={call} className="h-full" animationType="fade" transparent={false}>
        <SafeAreaView className="h-full pt-12 flex relative bg-black">

          <View className='h-20 flex flex-row px-5 bg-black z-50'>
            <TouchableOpacity className="w-1/6 h-full items-center flex justify-center" onPress={() => {setChatOrCall(true); setCall(false);}}>
              <MaterialIcons name="exit-to-app" size={24} color="#B22222" />
            </TouchableOpacity>
            <View className='w-4/6 h-full items-center flex justify-center'>
                <Text className="text-xl text-white font-semibold">Ongoing session</Text>
            </View>
            <View className="w-1/6 h-full items-center flex justify-center">
              <View className="bg-green-700 w-2 h-2 rounded-full">

              </View>
            </View>
          </View>
              
          
          <View className="w-full h-[85%]">
            <View className="w-full h-[70%]">
              <ScrollView ref={scrollViewRef} className="w-full  px-3 overflow-hidden" contentContainerStyle={{ flexGrow: 1 }} alwaysBounceVertical={false}  onContentSizeChange={() => scrollViewRef.current.scrollToEnd({ animated: true })}>
                  <View onStartShouldSetResponder={() => true} className="justify-end  h-full items-center content-end">

                    
                  {messages.map((message) => {
                            if (message.sender === 'me') {
                              return(
                                
                                <View className="flex flex-row my-2" key={message.id}>
                                <View className="w-auto items-center mr-3">
                                  <Image className="h-10 w-10 rounded-full border border-white" source={require('../../assets/chris.jpg')}/>
                                </View>
                                <View className=" w-5/6 min-h-16 px-2 py-3 justify-center rounded-lg">
                                  <Text className="text-white">{message.text}</Text>
                                </View>
                              </View>
                              )
                            }
                            if (message.sender ==='other'){

                              return (
                                <View className="flex flex-row my-2" key={message.id}>
                                <View className="w-auto items-center mr-3">
                                  <Image className="h-10 w-10 rounded-full border border-white" source={require('../../assets/ana.jpeg')}/>
                                </View>
                                <View className=" w-5/6 min-h-16 px-2 py-3 justify-center rounded-lg">
                                  <Text className="text-gray-400">{message.text}</Text>
                                </View>
                              </View>
                              )
                            }
                          })}

                  </View>
                </ScrollView>
            </View>
            <View className="bottom-0 w-full h-[25%] items-center absolute ">
              {
                listening ? 
                <Text className="mb-8 font-semibold text-gray-400">
                  Listening...
                </Text>
              :
                <Text className="mb-8 font-semibold text-gray-400">
                  Processing...
                </Text>
              }
              <TouchableOpacity onPress={recording ? stopRecording : startRecording} className="bg-white shadow-md shadow-black w-1/4 rounded-full items-center justify-center aspect-square" onPressIn={() => setListen(true)} onPressOut={() => setListen(false)}>
                <FontAwesome5 name="microphone" size={32} color="black" />
              </TouchableOpacity>
              <TouchableOpacity onPress={() => {setChatOrCall(false); setCall(false)}} className="bg-white absolute bottom-11  right-7 shadow-md shadow-black w-12 rounded-full items-center justify-center aspect-square" onPressIn={() => setListen(true)} onPressOut={() => setListen(false)}>
                <MaterialIcons name="keyboard" size={26} color="black" />
              </TouchableOpacity>
            </View>
          </View>
        </SafeAreaView>
      </Modal>
    )
  }

  const scrollViewRef = useRef();

  // console.log('eve', messages);

  return (
    <KeyboardAvoidingView
    behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
    style={{flex: 1}}>
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <SafeAreaView className="h-full flex relative bg-white">

            <View className='h-20 flex flex-row px-5 bg-white z-50'>
              <TouchableOpacity className="w-1/6 h-full items-center flex justify-center" onPress={() => {setChatOrCall(true); setCall(false)}}>
              <MaterialIcons name="exit-to-app" size={24} color="#B22222" />
            </TouchableOpacity>
              <View className='w-4/6 h-full items-center flex justify-center'>
                  <Text className="text-xl font-semibold">Ongoing session</Text>
              </View>
              <View className="w-1/6 h-full items-center flex justify-center">
                <View className="bg-green-700 w-2 h-2 rounded-full">
                </View>
              </View>
            </View>
        <View className="absolute bottom-5 flex h-full w-full">
          <View className="bottom-0 h-[100%] w-full pt-5 justify-end absolute">
            {
              chatOrCall ?
                <>
                  <SafeAreaView className="h-full w-full p-5  ">
                    <TouchableOpacity onPress={() => setChatOrCall(false)} className="h-1/2 items-center justify-center w-full rounded-xl mb-5 bg-black">
                      <MaterialIcons name="chat-bubble" size={48} color="white" />
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => setCall(true)} className="h-1/2 w-full items-center justify-center rounded-xl bg-black">
                      <MaterialIcons name="call" size={48} color="white" />
                    </TouchableOpacity>
                    
                  </SafeAreaView>
                </>
              :
<>
              <View className="pt-28 h-full">
                <ScrollView ref={scrollViewRef} className="w-full px-3  overflow-hidden" contentContainerStyle={{ flexGrow: 1 }} alwaysBounceVertical={false} onContentSizeChange={() => scrollViewRef.current.scrollToEnd({ animated: true })} >
                  <View onStartShouldSetResponder={() => true} className=" h-full justify-end items-center content-end">

                        

                          {messages.map((message) => {
                            if (message.sender === 'me') {
                              return(
                                <View className="flex flex-row my-2" key={message.id} >
                                  <View className="w-auto  items-center">
                                    <Image className="h-10 w-10 rounded-full border border-white mr-3" source={require('../../assets/chris.jpg')}/>
                                  </View>
                                  <View className="bg-[#F7F7F7] w-5/6 min-h-16 px-2 py-3 justify-center rounded-lg">
                                    <Text>{message.text}</Text>
                                  </View>
                                </View>
                              )
                            }
                            if (message.sender ==='other'){
                             
                              return (
                              <View className="flex flex-row my-2" key={message.id} >
                                <View className="w-auto  items-center">
                                  <Image className="h-10 w-10 rounded-full border border-white mr-3" source={require('../../assets/ana.jpeg')}/>
                                </View>
                                <View className="bg-[#F7F7F7] w-5/6 min-h-16 px-2 py-3 justify-center rounded-lg">
                                  <Text>{message.text}</Text>
                                </View>
                              </View>)
                            }
                          })}
                  </View>

                </ScrollView>
              </View>


              <View className="bottom-0 mt-3 items-center justify-center pb-3">


              
                <View className="">
                  <TouchableOpacity className="flex flex-row rounded-full border py-3 px-5 items-center border-[#0036783f]" onPress={() => setCall(!call)}>
                    <View className="mr-2">
                      <MaterialIcons name="add-call" size={24}  color="black" />
                    </View>
                    <Text className="text-[#3C3C3C]">
                      Start a call
                    </Text>
                  </TouchableOpacity>
                </View>
                  <View className="flex w-full justify-center flex-row mt-3 ml-2 items-center">
                    <View className="w-[80%]  justify-center mr-3">
                      <TextInput
                        className="text-black border w-full border-[#0036783f] px-4 py-3 rounded-full"
                        onChangeText={handleChange}
                        value={messageToGPT}
                        placeholder="What's on your mind?"
                        placeholderTextColor={'gray'}
                      />
                      <TouchableOpacity className="absolute right-2" >
                        <MaterialIcons name="mic" size={24} color="black" />
                      </TouchableOpacity>
                    </View>
                    
                    <TouchableOpacity className="p-3 bg-[#003778] rounded-full justify-center items-center" onPress={sendMessage}>
                      
                      <MaterialIcons name="send" size={18} color="white" />
                    </TouchableOpacity>
                  </View>
              </View>
              </>
              }
            </View>
        </View>
        {renderModal()}
        </SafeAreaView>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  )
}

export default Chat