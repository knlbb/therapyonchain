import { createPublicClient, http } from 'viem'
import { mainnet } from 'viem/chains'

const client = createPublicClient({ 
    chain: mainnet, 
    transport: http(), 
}) 

const getBlockNumber = async () => {
    const blockNumber = await client.getBlockNumber()
    return blockNumber
}
