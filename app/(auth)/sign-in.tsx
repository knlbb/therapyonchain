import { client } from "@/components/dynamicClient"
import { useState } from "react"
import {  Text, TextInput, TouchableOpacity, View } from "react-native"
import { SafeAreaView } from "react-native-safe-area-context"

const SignIn = () => {

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
      
        const handleVerifyOTP = () => {
          console.log(
           client.auth.email.verifyOTP(otp));
        }
      
        return (<>
                     <client.reactNative.WebView />
        
            <SafeAreaView className="flex h-full items-center justify-center bg-white">
            {!otpSent ? (
              <View>
                <TextInput
                  value={email}
                  onChangeText={setEmail}
                  placeholder="Enter your email"
                  className="bg-red-50"
                />
      
                <TouchableOpacity onPress={handleSendOTP}>
                    <Text>
                        Send OTP
                    </Text>
                </TouchableOpacity>
              </View>
            ) : (
              <View>
                <TextInput
                  value={otp}
                  onChangeText={setOtp}
                  placeholder="Enter OTP"
                  className="bg-green-100"
                />
      
                <TouchableOpacity onPress={handleVerifyOTP}>
                    <Text>
                        Verify OTP
                    </Text>
                </TouchableOpacity>
      
                <TouchableOpacity onPress={handleResendOTP}>
                    <Text>
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
    //         router.replace('/(root)/home')
    //     }}>
    //         <Text>
    //             Next
    //         </Text>
    //     </TouchableOpacity>
    // </SafeAreaView>
    // )
}

export default SignIn