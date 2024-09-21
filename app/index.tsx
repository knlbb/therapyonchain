import { createContext, useState } from 'react';
import { Redirect } from "expo-router"
import { client } from '../components/dynamicClient';
import { SessionProvider } from './session';

const Home = () => {

    return (
        <>
            <client.reactNative.WebView />
            <Redirect href="/(auth)/sign-in"/>
        </>
    )
}

export default Home



    