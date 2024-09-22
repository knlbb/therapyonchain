import { Text, TextInput, TouchableOpacity, View } from "react-native"
import { SafeAreaView } from "react-native-safe-area-context"
import { router, useLocalSearchParams } from "expo-router";
import "@ethersproject/shims"
import { useState } from "react";

import axios from "axios";

const SignUp = () => {
    const { walletAddress, firstName, lastName, email } = useLocalSearchParams();
    const [domainN, setDomain] = useState('');
    const name = firstName + ' ' + lastName
    const setDomainData = async () => {
        const url = 'https://namestone.xyz/api/public_v1/set-name';
        const data = {
          domain: 'tonybytes.eth',
          name: domainN,
          address: walletAddress,
          text_records: {
            name:name,
            email: email,
          },
        };
      
        try {
          const response = await fetch(url, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
              Authorization: 'e74ee03b-04ef-45ec-abe6-40ceebe9e2e0',
            },
            body: JSON.stringify(data),
          });
      
          if (!response.ok) {
            throw new Error('Network response was not ok');
          }
      
          const responseData = await response.json();
          console.log(responseData);
          if (responseData["success"]){
            router.replace("/(onboarding)/signMessage")
          }
        } catch (error) {
          console.error('Error:', error);
        }
      };
  

    return (
        <SafeAreaView className="flex h-full items-center justify-center bg-white">
            <View className="w-full h-full p-5">
                <Text className="text-xl w-full text-center font-bold m-5">
                    Pick your ENS name!
                </Text>
                <TextInput
                    placeholder="Enter ENS domain (e.g. myname)"
                    value={domainN}
                    onChangeText={setDomain}
                    className=" w-full border rounded-xl border-gray-200 p-3"
                />
                <TouchableOpacity onPress={setDomainData} className="w-full p-3 m-5 items-center bottom-0 absolute bg-black rounded-xl">
                    <Text className="text-white">
                        Continue
                    </Text>
                </TouchableOpacity>
            </View>
        </SafeAreaView>
    )
}

export default SignUp