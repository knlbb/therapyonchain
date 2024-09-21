import { createClient } from '@dynamic-labs/client'
import { ReactNativeExtension } from '@dynamic-labs/react-native-extension'
import { useReactiveClient } from '@dynamic-labs/react-hooks'
import { ViemExtension } from '@dynamic-labs/viem-extension'


export const client = createClient({
  environmentId: '0ca43614-c00f-4337-b310-4c1ba9ef7182',
})
.extend(ReactNativeExtension())
.extend(ViemExtension())

export const useDynamic = () => useReactiveClient(client)

