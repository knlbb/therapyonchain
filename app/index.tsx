import { Redirect } from "expo-router"
import { client } from '../components/dynamicClient';


    
const Home = () => {
    return (
        <>
            <client.reactNative.WebView />
            <Redirect href="/(root)/home"/>
        </>
    )
}

export default Home



    