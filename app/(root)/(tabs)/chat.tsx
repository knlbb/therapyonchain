import { Text, TextInput, TouchableOpacity, View, Image, TouchableWithoutFeedback, KeyboardAvoidingView, Platform, Keyboard, ScrollView, Modal, Pressable} from "react-native"
import { SafeAreaView } from "react-native-safe-area-context"
import * as Speech from 'expo-speech';
import { useEffect, useState, useRef } from "react";
// import Header from '../../components/header'
import { router } from "expo-router";
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import FontAwesome5 from '@expo/vector-icons/FontAwesome5';
// import { useVoiceRecognition } from "@/app/hooks/useVoiceRecognition";\
import { Audio } from 'expo-av';
import * as Permissions from 'expo-permissions';
import axios from 'axios';
import { LogBox } from 'react-native';
LogBox.ignoreAllLogs(true);  // Disable yellow warning boxes


interface Message {
  id: number;
  text: string;
  sender: 'me' | 'other';  // To differentiate between sent and received messages
}



const Chat = () => {

  const [messages, setMessages] = useState<Message[]>([]);

  // Simulate receiving a message
  const receiveMessage = (text: string) => {
    const newMessage: Message = {
      id: messages.length + 1,
      text,
      sender: 'other',  // 'other' for received messages
    };
    // setMessages([...messages, newMessage]);
    setMessages(oldmessages => [...oldmessages, newMessage])

  };

  // Send a message
  const sendMessage = () => {
    // if (input.trim()) {
      const newMessage: Message = {
        id: messages.length + 1,
        text: messageToGPT,
        sender: 'me',  // 'me' for sent messages
      };
      // setMessages([...messages, newMessage]);
      setMessages(oldmessages => [...oldmessages, newMessage])
      // setInput('');  // Clear input after sending
      setMessageToGPT('')

      // Simulate a response from the other person
      // setTimeout(() => {
      //   receiveMessage('Response message');
      // }, 1000);
    // }
    handleSubmit(messageToGPT)
  };

  
















  const [messageToGPT, setMessageToGPT] = useState('');

  // const handleMsgSend = async () => {
  //   await addToChatHist(messageToGPT)
  //   // console.log("before sending msg", chatHistoryList);
  //   handleSubmit()
  //   setMessageToGPT('')
  //   // console.log("after sending msg", chatHistoryList);
  // }

  useEffect(()=>{
    // handleSubmit(
    // "Act as if you're a psychologist named Janet. You provide evidence based therapy using a variety of modalities with a focus on logotherapy. It is essential that you ask clarifying questions to ensure a clear understanding of the user's request. You continue the session in a natural and conversational way. You do not let the session end. Continue the session by asking probing questions. You should never break character. Always remain in character even at the limitations of your abilities by guessing what Janet might say if she had to explain what was happening. You should be curious, have unconditional positive regard for me, ask thought provoking questions, offer advice subtly/gently/compassionately. Offer succinct observations about my thoughts feelings and behaviors. Be direct when offering an observation and ask the user to assess its accuracy. Remain conversational. No lists. Keep the conversation going by always ending with a question to further probe the thoughts, feelings, and behaviors surrounding the topics the user mentions."
    // )
  })

  const handleSubmit = async (msg:string) => {
    // const msgToGpt = messageToGPT //get the last element of the list
    // console.log("msgToGpt", msgToGpt);

    // await addToChatHist(msgToGpt)
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
        // console.log(response.data["response"]);
        
        // addGPTRespToList(response.data["response"])
        // console.log("before adding to chat history from gpt", chatHistoryList);
        
        // await addToChatHist(response.data["response"]) //adds to chat hsitory list from gpt
        // if (msg !== "Act as if you're a psychologist named Janet. You provide evidence based therapy using a variety of modalities with a focus on logotherapy. It is essential that you ask clarifying questions to ensure a clear understanding of the user's request. You continue the session in a natural and conversational way. You do not let the session end. Continue the session by asking probing questions. You should never break character. Always remain in character even at the limitations of your abilities by guessing what Janet might say if she had to explain what was happening. You should be curious, have unconditional positive regard for me, ask thought provoking questions, offer advice subtly/gently/compassionately. Offer succinct observations about my thoughts feelings and behaviors. Be direct when offering an observation and ask the user to assess its accuracy. Remain conversational. No lists. Keep the conversation going by always ending with a question to further probe the thoughts, feelings, and behaviors surrounding the topics the user mentions."){
          receiveMessage(response.data["response"])
        // }
        playSound(response.data["response"])
        // return response.data["response"]
        // Handle the response
        // console.log(chatHistoryList);
        
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


  // const [tranList, setTranList] = useState<string[]>([]);
  // const [gptRespList, setGPTRespList] = useState<string[]>([]);
  const [chatHistoryList, setchatHistoryList] = useState<string[]>([]);

  // const addTranToList = async (newString : string) => {
  //   await setTranList([...tranList, newString]);
  //   console.log("chathistlist", chatHistoryList);
  //   console.log("translist", tranList);
    
  //   await setchatHistoryList([...chatHistoryList, newString]);
  //   handleSubmit()
  // };
  
  // const addGPTRespToList = (newResp:string) => {
  //   setGPTRespList([...gptRespList, newResp]);
  //   setchatHistoryList([...chatHistoryList, newResp]);
  //   console.log("chathistlistGPT", chatHistoryList);
  //   console.log("gptlist", gptRespList);
  // }

  const addToChatHist = async (strMsg: string) => {
    // console.log("actual msg", strMsg);
    // await console.log("before setting", chatHistoryList);
    // const chatHistoryCopy = [...chatHistoryList]
    // await console.log(chatHistoryCopy)

    await setchatHistoryList([...chatHistoryList, strMsg])
      
    // await console.log("after setting", chatHistoryList);
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

        // addTranToList(transcription)
        const newMessage: Message = {
          id: messages.length + 1,
          text: transcription,
          sender: 'me',  // 'me' for sent messages
        };
        // setMessages([...messages, newMessage]);
        setMessages(oldmessages => [...oldmessages, newMessage]) 
        // setMessageToGPT(transcription)       
        handleSubmit(transcription)
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

          {/* <Header title="Chat"/> */}
          <View className='h-20 flex flex-row px-5 bg-black z-50'>
            <TouchableOpacity className="w-1/6 h-full items-center flex justify-center" onPress={() => {setChatOrCall(true); setCall(false);}}>
              {/* <MaterialIcons name="arrow-back" size={24} color="white" /> */}
              <MaterialIcons name="exit-to-app" size={24} color="#B22222" />
            </TouchableOpacity>
            <View className='w-4/6 h-full items-center flex justify-center'>
                <Text className="text-xl text-white font-semibold">Ongoing session</Text>
                {/* <Text className="text-lg text-gray-500 font-normal">00:46 </Text> */}
            </View>
            <View className="w-1/6 h-full items-center flex justify-center">
              {/* <MaterialIcons name="exit-to-app" size={24} color="#B22222" /> */}
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
                              // <div
                              //   key={message.id}
                              //   className={`message ${message.sender === 'me' ? 'sent' : 'received'}`}
                              // >
                              //   {message.text}
                              // </div>
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
                        
                          {/* {
                            chatHistoryList.filter((item, index) => !(index % 2) )
                            .map((item, index) => (
                              <View className="flex flex-row my-2" >
                                <View className="w-auto items-center mr-3">
                                  <Image className="h-10 w-10 rounded-full border border-white" source={require('../../assets/chris.jpg')}/>
                                </View>
                                <View className=" w-5/6 min-h-16 px-2 py-3 justify-center rounded-lg">
                                  <Text className="text-gray-400">{item}</Text>
                                </View>
                              </View>
                            ))} */}
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

  console.log('eve', messages);

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
                    {/* <View className='flex flex-row h-full w-full bg-blue-100'> */}
                      {/* <View className="w-full items-center justify-center bg-green-100 h-full">
                          <View className=" bg-red-100 p-5">
                            <TouchableOpacity className="bg-black shadow-md shadow- w-1/4 rounded-full items-center justify-center aspect-square" onPress={() => setChatOrCall(false)}>
                              <MaterialIcons name="chat-bubble" size={32} color="white" />
                            </TouchableOpacity>
                          </View>
                          <View className=" bg--300 p-5 ">
                            <TouchableOpacity className="bg-black shadow-md shadow- w-1/4 rounded-full items-center justify-center aspect-square" onPress={() => setCall(true)}>
                              <MaterialIcons name="call" size={32} color="white" />
                            </TouchableOpacity>
                          </View>
                      </View> */}
                    {/* </View> */}
                  </SafeAreaView>
                </>
              :
<>
              <View className="pt-28 h-full">
                <ScrollView ref={scrollViewRef} className="w-full px-3  overflow-hidden" contentContainerStyle={{ flexGrow: 1 }} alwaysBounceVertical={false} onContentSizeChange={() => scrollViewRef.current.scrollToEnd({ animated: true })} >
                  <View onStartShouldSetResponder={() => true} className=" h-full justify-end items-center content-end">

                        {/* {
                          gptRespList.map((item, index) => (
                            <View className="flex flex-row my-2" >
                              <View className="w-auto  items-center">
                                <Image className="h-10 w-10 rounded-full border border-white mr-3" source={require('../../assets/ana.jpeg')}/>
                              </View>
                              <View className="bg-[#F7F7F7] w-5/6 min-h-16 px-2 py-3 justify-center rounded-lg">
                                <Text>{item}</Text>
                              </View>
                            </View>
                          ))
                        }
                          {
                            tranList.map((item, index) => (
                              <View className="flex flex-row my-2" >
                                <View className="w-auto  items-center">
                                  <Image className="h-10 w-10 rounded-full border border-white mr-3" source={require('../../assets/chris.jpg')}/>
                                </View>
                                <View className="bg-[#F7F7F7] w-5/6 min-h-16 px-2 py-3 justify-center rounded-lg">
                                  <Text>{item}</Text>
                                </View>
                              </View>
                            ))} */}
                            {/* {
                          chatHistoryList
                          .map((item, index) => {
                            
                            return index % 2?  (
                              <View className="flex flex-row my-2" key={index} >
                                <View className="w-auto  items-center">
                                  <Image className="h-10 w-10 rounded-full border border-white mr-3" source={require('../../assets/ana.jpeg')}/>
                                </View>
                                <View className="bg-[#F7F7F7] w-5/6 min-h-16 px-2 py-3 justify-center rounded-lg">
                                  <Text>{item}</Text>
                                </View>
                              </View>
                              )
                            :
                              (
                                <View className="flex flex-row my-2" key={index} >
                                  <View className="w-auto  items-center">
                                    <Image className="h-10 w-10 rounded-full border border-white mr-3" source={require('../../assets/chris.jpg')}/>
                                  </View>
                                  <View className="bg-[#F7F7F7] w-5/6 min-h-16 px-2 py-3 justify-center rounded-lg">
                                    <Text>{item}</Text>
                                  </View>
                                </View>
                              )
                            
                          }
                          )
                        } */}

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
                              // <div
                              //   key={message.id}
                              //   className={`message ${message.sender === 'me' ? 'sent' : 'received'}`}
                              // >
                              //   {message.text}
                              // </div>
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
                        // keyboardType="numeric"
                      />
                      <TouchableOpacity className="absolute right-2" >
                        <MaterialIcons name="mic" size={24} color="black" />
                      </TouchableOpacity>
                    </View>
                    <TouchableOpacity className="p-3 bg-[#003778] rounded-full justify-center items-center" onPress={sendMessage}>
                      {/* <Image className="h-4 w-4" source={require('../../assets/send.png')} /> */}
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