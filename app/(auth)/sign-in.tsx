import { client, useDynamic } from "@/components/dynamicClient"
import { router } from "expo-router"
import { useState } from "react"
import {  Text, TextInput, TouchableOpacity, View } from "react-native"
import { SafeAreaView } from "react-native-safe-area-context"

const SignIn = () => {
        const { auth } = useDynamic();


        const [email, setEmail] = useState('')
        const [otp, setOtp] = useState('')
        const [otpSent, setOtpSent] = useState(false)
      
        const handleSendOTP = async () => {
          await client.auth.email.sendOTP(email)
          setOtpSent(true)
        }
      
        const handleResendOTP = () => {
          client.auth.email.resendOTP()
        }
      
        const handleVerifyOTP =  () => {
            console.log("here");
            
            try {
              client.auth.email.verifyOTP(otp)
              if (auth.authenticatedUser){
                router.replace(
                {
                    // pathname: '/(root)/home',
                    pathname: '/(root)/home',
                    params: {
                      walletAddress: auth.authenticatedUser?.verifiedCredentials[0].address
                }})
                console.log(auth.authenticatedUser?.verifiedCredentials);
              }
            } catch (error) {
              console.log(error);
            }        
        }
      
        return (<>
                     <client.reactNative.WebView />
        
            <SafeAreaView className="flex h-full items-center justify-center bg-white">
            {!otpSent ? (
              <View className="w-full items-center p-5">
                <Text className="text-xl font-bold m-5">
                    Sign In
                </Text>
                <TextInput
                  value={email}
                  onChangeText={setEmail}
                  placeholder="Enter your email"
                  className=" w-2/3 border rounded-xl border-gray-200 p-3"
                />
      
                <TouchableOpacity onPress={handleSendOTP} className="w-2/3 p-3 m-5 items-center bg-black rounded-xl">
                    <Text className="text-white">
                        Send OTP
                    </Text>
                </TouchableOpacity>
              </View>
            ) : (
              <View className="w-full items-center p-5">
                <Text className="text-xl font-bold m-5">
                    Verify
                </Text>
                <TextInput
                  value={otp}
                  onChangeText={setOtp}
                  placeholder="Enter OTP"
                  className=" w-2/3 border rounded-xl border-gray-200 p-3"
                />
      
                <TouchableOpacity onPress={handleVerifyOTP} className="w-2/3 p-3 m-5 items-center bg-black rounded-xl">
                    <Text className="text-white">
                        Verify OTP
                    </Text>
                </TouchableOpacity>
      
                <TouchableOpacity onPress={handleResendOTP} className="w-2/3 p-3 items-center border border-black rounded-xl">
                    <Text className="">
                        Resend OTP
                    </Text>
                </TouchableOpacity>
              </View>
            )}
          </SafeAreaView>
        </>

        )

      
    // return (
    //     <SafeAreaView className="flex h-full items-center justify-center bg-white">
    //     <Text>
    //         SignIn
    //     </Text>
    //     <TouchableOpacity className="" onPress={() => {
    //         router.replace(
    //           {
    //               // pathname: '/(root)/home',
    //               pathname: '/(root)/home',
    //               params: {
    //                 walletAddress: ""
    //           }})
    //     }}>
    //         <Text>
    //             Next
    //         </Text>
    //     </TouchableOpacity>
    // </SafeAreaView>
    // )
}

export default SignIn