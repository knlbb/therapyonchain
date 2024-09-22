import { useFonts } from 'expo-font';
import { Stack } from 'expo-router';
import * as SplashScreen from 'expo-splash-screen';
import { useEffect, useState } from 'react';
import 'react-native-reanimated';
import { StatusBar, } from 'react-native'
import { SessionProvider } from './session';
import { DynamicContextProvider } from "@dynamic-labs/sdk-react-core";

SplashScreen.preventAutoHideAsync();

const evmNetworks = [{
  blockExplorerUrls: [''],
  chainId: 0x5afd,
  chainName: 'NyxChain',
  iconUrls: ["https://app.dynamic.xyz/assets/networks/polygon.svg"],
  name: 'nyx',
  nativeCurrency: {
    decimals: 18,
    name: 'Oasis Test',
    symbol: 'OATEST',
  },
  networkId: 0x5afd,
  rpcUrls: ['http://47.236.76.246:8545'],
  vanityName: 'nyx',
}]

const environmetId = "0ca43614-c00f-4337-b310-4c1ba9ef7182"

export default function RootLayout() {
  const [loaded] = useFonts({
  });

  useEffect(() => {
    if (loaded) {
      SplashScreen.hideAsync();
    }
  }, [loaded]);

  if (!loaded) {
    return null;
  }


  return (
    // <DynamicContextProvider settings={{
    //   environmentId:  environmetId,
    //   overrides: 
    //   {
    //    evmNetworks
    //   },
    // }}>
      <SessionProvider>
      <>
      <StatusBar backgroundColor={"#FFFFFF"} barStyle={"dark-content"}/> 
      <Stack>
        <Stack.Screen name="index" options={{ headerShown: false }} />
        <Stack.Screen name="(root)" options={{ headerShown: false }} />
        <Stack.Screen name="(auth)" options={{ headerShown: false }} />
        <Stack.Screen name="(onboarding)" options={{ headerShown: false }} />
        <Stack.Screen name="+not-found" />
      </Stack>
      </>
    </SessionProvider>
    // </DynamicContextProvider>
    
  );
}
