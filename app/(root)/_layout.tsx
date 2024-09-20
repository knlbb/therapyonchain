import { Stack, Tabs } from "expo-router"

const Layout = () => {
    return (
        <Stack screenOptions={{contentStyle:{backgroundColor: '#ffffff'}}}>
            {/* <Stack.Screen name="(tabs)" options={{headerShown: false}}/> */}
            <Stack.Screen name="(tabs)" options={{headerShown: false}}/>
            {/* <Stack.Screen name="home" options={{headerShown: false}}/> */}
            {/* <Stack.Screen name="chat" options={{headerShown: false}}/> */}
        </Stack>
    )
}

export default Layout