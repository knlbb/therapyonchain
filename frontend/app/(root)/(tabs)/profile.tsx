import { Text, TouchableOpacity, View, Image } from "react-native"
import { SafeAreaView } from "react-native-safe-area-context"
// import Header from '../../components/header'
import { router } from "expo-router"
import MaterialIcons from '@expo/vector-icons/MaterialIcons';


 const Profile = () => {
  return (
    <SafeAreaView className="bg-white">
      

      <View className="h-full">

        <View className=" items-center justify-center mt-5 mb-5">
            <Image className="h-32 w-32 rounded-full border border-white mb-5" source={require('../../assets/chris.jpg')} />
            <Text className="text-2xl font-bold">Chris Hemsworth</Text>
        </View>
        
        <View className="flex justify-center mb-5 mx-5 flex-row">
          <View className="w-full pt-5 items-center gap-2">
            <TouchableOpacity className="w-full  flex flex-row rounded-xl p-5 items-center bg-gray-100">
                <Image className="h-10 w-10 mr-5" source={require('../../assets/personalinfo.png')} />
                <Text className="font-bold text-md">
                    Personal Information
                </Text>
            </TouchableOpacity>
            <TouchableOpacity className="w-full  flex flex-row rounded-xl p-5 items-center bg-gray-100">
                <Image className="h-10 w-10 mr-5" source={require('../../assets/callsummary.png')} />
                <Text className="font-bold text-md">
                    Session History
                </Text>
            </TouchableOpacity>
            <TouchableOpacity className="w-full  flex flex-row rounded-xl p-5 items-center bg-gray-100">
                <Image className="h-10 w-10 mr-5" source={require('../../assets/moodhistory.png')} />
                <Text className="font-bold text-md">
                    Mood Tracker History
                </Text>
            </TouchableOpacity>
            <TouchableOpacity className="w-full  flex flex-row rounded-xl p-5 items-center bg-gray-100">
                <Image className="h-10 w-10 mr-5" source={require('../../assets/settings.png')} />
                <Text className="font-bold text-md">
                    Settings
                </Text>
            </TouchableOpacity>
            
          </View>
        </View>
        <View className="w-full bottom-0 absolute items-center">
          <View className="flex flex-row m-5 items-center">
            <MaterialIcons name="exit-to-app" size={24} color="#B22222" />
            <Text className="font-semibold ml-2">
                Log Out
            </Text>
          </View>
        </View>
          
        {/* <View>
            <TouchableOpacity className="bg-gray-600 py-3 px-5 mx-5 my-2 rounded-xl" onPress={() => {router.replace('/(root)/chat')}}>
              <View className="flex flex-row items-center relative">
                  <Image className="h-12 w-12 rounded-xl border border-white mr-3" source={require('../../assets/chris.jpg')}/>
                  <Text className="text-white">
                      Log Out
                  </Text>
                  <Image className="h-6 w-6 right-0 absolute" source={require('../../assets/send.png')}/>
              </View>
            </TouchableOpacity>
        </View> */}
      </View>
    </SafeAreaView>
  )
}

export default Profile