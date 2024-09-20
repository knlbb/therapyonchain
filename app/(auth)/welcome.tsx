import { router } from "expo-router"
import { Text, TouchableOpacity, View } from "react-native"
import { SafeAreaView } from "react-native-safe-area-context"

const Onboarding = () => {
    return (
        <SafeAreaView className="flex h-full items-center justify-center bg-white">
            <Text>
                Onboard
            </Text>
            <TouchableOpacity className="" onPress={() => {
                router.replace('/(auth)/sign-in')
            }}>
                <Text>
                    Next
                </Text>
            </TouchableOpacity>
        </SafeAreaView>
    )
}

export default Onboarding