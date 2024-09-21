// // import { Web3Storage, File } from 'web3.storage';
// import { create } from '@web3-storage/w3up-client'

// export default async function storeJsonFile() {
//     const client = await create()
//     const space = await client.createSpace('nyx-space')
//     const myAccount = await client.login('knlbht1@gmail.com')
//     await myAccount.provision(space.did())
//     await space.save()
//     await client.setCurrentSpace(space.did())
//     const recovery = await space.createRecovery(myAccount.did())
//     await client.capability.access.delegate({
//         space: space.did(),
//         delegations: [recovery],
//     })

//     const files = [
//         new File(['some-file-content'], 'readme.md'),
//         new File(['import foo'], 'src/main.py'),
//     ]
       
//     const directoryCid = await client.uploadDirectory(files)
//     console.log(directoryCid)
// }