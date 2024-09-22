import { client, useDynamic } from "@/components/dynamicClient"
import { router } from "expo-router"
import { useState } from "react"
import {  FlatList, Text, TextInput, TouchableOpacity, View } from "react-native"
import { SafeAreaView } from "react-native-safe-area-context"

const PersonalInfo = () => {
        const { auth } = useDynamic();
        const [firstName, setFirstName] = useState('')
        const [lastName, setLastName] = useState('')
        const [age, setAge] = useState('')

        const goHome =() =>{
            router.replace(
                {
                    pathname: '/(onboarding)/ensRegister',
                    params: {
                        walletAddress: auth.authenticatedUser?.verifiedCredentials[0].address,
                        firstName: firstName,
                        lastName: lastName,
                        age: age,
                        email: auth.authenticatedUser?.email
                    }}
            )
        }
        return (
        <>
            <client.reactNative.WebView />
        
            <SafeAreaView className="flex h-full items-center justify-center bg-white">
              <View className="w-full h-full p-5">
                <Text className="text-xl w-full text-center font-bold m-5">
                    Tell us about yourself!
                </Text>
                <Text className="text-md font-bold m-5">
                    First Name
                </Text>
                <TextInput
                  value={firstName}
                  onChangeText={setFirstName}
                  placeholder="First Name"
                  className=" w-full border rounded-xl border-gray-200 p-3"
                />
                <Text className="text-md font-bold m-5">
                    Last Name
                </Text>
                <TextInput
                  value={lastName}
                  onChangeText={setLastName}
                  placeholder="Last Name"
                  className=" w-full border rounded-xl border-gray-200 p-3"
                />

                <Text className="text-md font-bold m-5">
                    Age
                </Text>

                <TextInput
                  value={age}
                  onChangeText={setAge}
                  keyboardType = {'numeric'}
                  placeholder="Age"
                  className=" w-full border rounded-xl border-gray-200 p-3"
                />

                <Text className="text-md font-bold m-5">
                    Country
                </Text>

                <TextInput
                  value={age}
                  onChangeText={setAge}
                  keyboardType = {'numeric'}
                  placeholder="Country"
                  className=" w-full border rounded-xl border-gray-200 p-3"
                />
      
                <TouchableOpacity onPress={goHome} className="w-full p-3 m-5 items-center bottom-0 absolute bg-black rounded-xl">
                    <Text className="text-white">
                        Continue
                    </Text>
                </TouchableOpacity>
              </View>
          </SafeAreaView>
        </>

        )

      
    // return (
    //     <SafeAreaView className="flex h-full items-center justify-center bg-white">
    //     <Text>
    //         SignIn
    //     </Text>
    //     <TouchableOpacity className="" onPress={() => {
    //         router.replace('/(root)/home')
    //     }}>
    //         <Text>
    //             Next
    //         </Text>
    //     </TouchableOpacity>
    // </SafeAreaView>
    // )
}

export default PersonalInfo