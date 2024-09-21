import { Text, TouchableOpacity, View, Image, ScrollView } from "react-native"
import { SafeAreaView } from "react-native-safe-area-context"
// import Header from '../../components/header'
import { router } from "expo-router"
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import { useLocalSearchParams } from "expo-router";


 const Home = () => {
  const { walletAddress } = useLocalSearchParams();

  return (
    <SafeAreaView className="bg-white">
      <View className='h-20 flex flex-row px-5'>
        <View className="w-1/6 h-full items-center flex justify-center">
          {/* <MaterialIcons name="menu" size={24} color="black" /> */}
          <Image className="h-12 w-12 rounded-full border border-white mr-3" source={require('../../assets/man.webp')}/>

        </View>
        <View className='w-4/6 h-full  flex justify-center'>
          <View className="flex flex-row">
            <Text className="text-xl ">Hi there </Text>
            <Text className="text-xl font-semibold">Chris</Text>
            <Text className="text-xl ">!</Text>
          </View>
          <Text className="text-xs text-gray-500 font-normal">{walletAddress}</Text>
        </View>
        <View className="w-1/6 h-full items-center flex justify-center">
          {/* <MaterialIcons name="exit-to-app" size={24} color="#B22222" /> */}
          {/* <View className="bg-green-700 w-2 h-2 rounded-full">

          </View> */}
        </View>
      </View>

      <View className="h-full">

        <View className="flex flex-row h-24">
          <View className="w-2/3 p-5 flex">
            <Text className="font-bold text-lg">
              Today
            </Text>
            <Text className="text-md text-gray-400">
              Your score is:
            </Text>
          </View>
          <View className="w-1/3 items-center justify-center flex">
            <Text className=" text-6xl font-extralight">
              83
            </Text>
          </View>
        </View>

        <View className="ml-5">
          {/* <Text className="text-gray-500">
            View history
          </Text> */}
        </View>
        <View className="flex  justify-center flex-row">
          <View className="w-[13%] aspect-square m-2  rounded-xl justify-center items-center bg-gray-100">
            {/* <Text>
              Thu
            </Text>
            <Text>
              10
            </Text> */}
            <MaterialCommunityIcons name="emoticon-sick-outline" size={24} color="black" />
          </View>
          <View className="w-[13%] aspect-square m-2  rounded-xl justify-center items-center bg-gray-100">
            {/* <Text>
              Thu
            </Text>
            <Text>
              10
            </Text> */}
            <MaterialCommunityIcons name="emoticon-angry-outline" size={24} color="black" />
          </View>
          <View className="w-[13%] aspect-square m-2  rounded-xl justify-center items-center bg-gray-100">
            {/* <Text>
              Thu
            </Text>
            <Text>
              10
            </Text> */}
            <MaterialCommunityIcons name="emoticon-sad-outline" size={24} color="black" />
          </View>
          <View className="w-[13%] aspect-square m-2  rounded-xl justify-center items-center bg-gray-100">
            {/* <Text>
              Thu
            </Text>
            <Text>
              10
            </Text> */}
            <MaterialCommunityIcons name="emoticon-happy-outline" size={24} color="black" />
          </View>
          {/* <View className="w-[13%] aspect-square m-2 rounded-xl justify-center items-center border border-[#ae97c1] bg-[#c99ded]"> */}
          <View className="w-[13%] aspect-square m-2 rounded-xl justify-center items-center border  bg-black">
            {/* <Text>
              Thu
            </Text>
            <Text>
              10
            </Text> */}
            <MaterialCommunityIcons name="emoticon-excited-outline" size={24} color="white" />
          </View>
          
        </View>
        
        {/* <TouchableOpacity className="bg-[#c99ded] py-3 px-5 mx-5 my-2 rounded-lg" onPress={() => {router.replace('/(root)/chat')}}> */}
        <TouchableOpacity className="bg-black py-3 px-5 mx-5 my-2 rounded-lg" onPress={() => {router.replace('/(root)/chat')}}>
          <View className="flex flex-row items-center w-full justify-center relative">
            {/* <Image className="h-12 w-12 rounded-full border border-white mr-3" source={require('../../assets/chris.jpg')}/> */}
            <Text className="text-white">
                View Mood History
            </Text>
            {/* <Image className="h-6 w-6 right-0 absolute" source={require('../../assets/send.png')}/> */}
          </View>
        </TouchableOpacity>

        {/* <TouchableOpacity className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full" onPress={() => {router.replace('/(root)/chat')}}>
            <Text>
                Next
            </Text>
        </TouchableOpacity> */}

          <View className="bg-gray-100 flex flex-row mx-5 rounded-xl mt-3">
            <View className="w-1/2 overflow-hidden justify-center p-5 rounded-l-xl">
              <Text className="text-md font-bold mb-2">
                Are you ready to have your therapy session?
              </Text>
              <TouchableOpacity className="bg-white py-3 px-3 mt-2 rounded-lg" onPress={() => {router.replace('/(root)/chat')}}>
                <View className="flex flex-row items-center w-full justify-center relative">
                  {/* <Image className="h-12 w-12 rounded-full border border-white mr-3" source={require('../../assets/chris.jpg')}/> */}
                  <Text className="text-black font-semibold">
                      Start Session
                  </Text>
                  {/* <Image className="h-6 w-6 right-0 absolute" source={require('../../assets/send.png')}/> */}
                </View>
              </TouchableOpacity>
            </View>
            <View className="w-1/2 aspect-square  rounded-r-xl">
              <Image className="w-full h-full object-cover" source={require('../../assets/anaai.png')}/>
            </View>
          </View>

        <View className="w-full mt-5 mb-3 flex items-center  flex-row px-5">
          <Text className="text-black font-bold text-lg ">
            Featured Readings
          </Text>
          <TouchableOpacity className="text-black flex flex-row items-center right-5 absolute font-bold text-lg ">
            <Text className="font-semibold text-gray-400">
              View all
            </Text>
            <MaterialIcons name="arrow-right" size={24} color="gray" />
          </TouchableOpacity>
        </View>
        
        <View className="px-5">

        <ScrollView horizontal={true} showsHorizontalScrollIndicator={false} className="flex flex-row gap-x-2 w-full">
          <View className="h-36 aspect-video p-5 bg-black rounded-xl">
            <Text className="text-white font-bold text-lg">
              Anxiety Issues
            </Text>
            <Text className="text-white text-md mt-2">
              Read how you can tackle anxiety issues in your daily life
            </Text>
            <TouchableOpacity className="bottom-5 right-5 absolute">
              <Text className="text-white">
                Read
              </Text>
            </TouchableOpacity>
          </View>
          <View className="h-36 aspect-video p-5 bg-black rounded-xl">
            <Text className="text-white font-bold text-lg">
              Tackle Depression
            </Text>
            <Text className="text-white text-md mt-2">
              5 healthy habits to remove depression from life 
            </Text>
            <TouchableOpacity className="bottom-5 right-5 absolute">
              <Text className="text-white">
                Read
              </Text>
            </TouchableOpacity>
          </View>
          
        </ScrollView>
        </View>

        {/* <View className="flex justify-center gap-x-2 flex-row mb-5">

          <View className="items-center w-[40%] gap-y-2 ">
            <View className="w-full h-32 rounded-xl flex flex-row items-center bg-gray-100">
              <View className="w-full">
                <View className="flex flex-row h-full justify-center items-center">
                  <View className="bg-[#874bb5] h-full left-0 absolute rounded-l-xl w-2"></View>
                  <Text>
                    Talk to 5 stangers
                  </Text>
                </View>
              </View>
            </View>
            <View className="w-full h-32 rounded-xl flex flex-row items-center bg-gray-100">
              <View className="w-full">
                <View className="flex flex-row h-full justify-center items-center">
                  <View className="bg-[#b54b4b] h-full left-0 absolute rounded-l-xl w-2"></View>
                  <Text>
                    Talk to 5 stangers
                  </Text>
                </View>
              </View>
            </View>
          </View>



          <View className=" gap-y-2 w-[40%] items-center">
            <View className="w-full h-32 rounded-xl flex flex-row items-center bg-gray-100">
              <View className="w-full">
                <View className="flex flex-row h-full justify-center items-center">
                  <View className="bg-[#4ba3b5] h-full left-0 absolute rounded-l-xl w-2"></View>
                  <Text>
                    Talk to 5 stangers
                  </Text>
                </View>
              </View>
            </View>
            <View className="w-full h-32 rounded-xl flex flex-row items-center bg-gray-100">
              <View className="w-full">
                <View className="flex flex-row h-full justify-center items-center">
                  <View className="bg-[#4bb559] h-full left-0 absolute rounded-l-xl w-2"></View>
                  <Text>
                    Talk to 5 stangers
                  </Text>
                </View>
              </View>
            </View>
          </View>

        </View> */}




        {/* <TouchableOpacity className="bg-[#000000] py-3 px-5 mx-5 my-2 rounded-lg" onPress={() => {router.replace('/(root)/chat')}}>
          <View className="flex flex-row items-center w-full justify-center relative">
            <Text className="text-white">
                View All Tasks
            </Text>
          </View>
        </TouchableOpacity> */}

      </View>
    </SafeAreaView>
  )
}

export default Home