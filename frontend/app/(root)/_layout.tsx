import { Stack, Tabs } from "expo-router"
import { SessionProvider } from "../session"

const Layout = () => {
    return (
        <Stack screenOptions={{contentStyle:{backgroundColor: '#ffffff'}}}>
        <Stack.Screen name="(tabs)" options={{headerShown: false}}/>
        </Stack>
    )
}

export default Layout