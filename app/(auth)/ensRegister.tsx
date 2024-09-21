import { Text, View } from "react-native"
import { SafeAreaView } from "react-native-safe-area-context"
import { useLocalSearchParams } from "expo-router";
import "@ethersproject/shims"
import { ContractRunner, ethers } from "ethers";
import { useState } from "react";

const ENS_REGISTRAR_ADDRESS = "0x57f1887a8BF19b14fC0dF6Fd9B2acc9Af147eA85"; // ENS .eth registrar

const SignUp = () => {
    const { walletAddress } = useLocalSearchParams();
    
    async function registerENS(walletAddress: String, domainName: any, ownerAddress: any) {
      // ABI of ENS Registrar contract
      const ENS_REGISTRAR_ABI = [
        "function register(bytes32 label, address owner, uint256 duration) external returns (uint256)"
      ];
    
      const ensRegistrar = new ethers.Contract(ENS_REGISTRAR_ADDRESS, ENS_REGISTRAR_ABI, walletAddress);
    
      // Hash the domain label (example: for "myname.eth", label would be "myname")
      const labelHash = ethers.keccak256(ethers.toUtf8Bytes(domainName));
    
      const oneYear = 365 * 24 * 60 * 60; // duration in seconds (1 year)
    
      // Send transaction to register the domain for the given owner
      const tx = await ensRegistrar.register(labelHash, ownerAddress, oneYear);
      
      console.log('Transaction submitted:', tx.hash);
      await tx.wait(); // wait for transaction confirmation
    
      console.log('Domain registered successfully!');
    }

    const [domain, setDomain] = useState('');
    // const [walletAddress, setWalletAddress] = useState('');

    const handleRegister = async () => {
        try {
        await registerENS(walletAddress, domain, walletAddress);
        alert(`Domain ${domain}.eth registered for ${walletAddress}`);
        } catch (error) {
        console.error('Error registering ENS domain:', error);
        }
    };

    return (
        <SafeAreaView>
            <Text>
                Register ENS
            </Text>
        </SafeAreaView>
    )
}

export default SignUp