// import { View, Text, SafeAreaView, TouchableOpacity } from 'react-native'
// import React from 'react'
// import MaterialIcons from '@expo/vector-icons/MaterialIcons';

// export default function chatOrCall() {
//   return (
//     <SafeAreaView className="h-full flex relative bg-">
//         <View className='flex flex-row h-full w-full bg--100'>
//             <View className="w-full items-center justify-center bg--100 h-full">
//                 <View className=" bg--100 p-5">
//                     <TouchableOpacity className="bg-black shadow-md shadow- w-1/4 rounded-full items-center justify-center aspect-square" onPress={() => setChatOrCall(false)}>
//                     {/* <FontAwesome5 name="microphone" size={32} color="white" /> */}
//                     <MaterialIcons name="chat-bubble" size={32} color="white" />
//                     </TouchableOpacity>
//                 </View>
//                 {/* <View className="w-full text-center line border-b mt-[10px] mb-[20px]">
//                     <Text className="py-[10px]">
//                     Or
//                     </Text>
//                 </View> */}
//                 <View className=" bg--300 p-5 ">
//                     <TouchableOpacity className="bg-black shadow-md shadow- w-1/4 rounded-full items-center justify-center aspect-square" onPress={() => setCall(true)}>
//                     {/* <FontAwesome5 name="microphone" size={32} color="white" /> */}
//                     <MaterialIcons name="call" size={32} color="white" />
//                     </TouchableOpacity>
//                 </View>
//             </View>
//         </View>
//     </SafeAreaView>
//   )
// }