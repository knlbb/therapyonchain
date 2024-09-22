import { Stack } from 'expo-router';

 const Layout = () => {
 
  return (
    <Stack>
      <Stack.Screen name="information" options={{ headerShown: false }} />
      <Stack.Screen name="ensRegister" options={{ headerShown: false }} />
      <Stack.Screen name="signMessage" options={{ headerShown: false }} />
      {/* <Stack.Screen name="sign-in" options={{ headerShown: false }} /> */}
    </Stack>
  );
}

export default Layout;