import { View, Text } from 'react-native'
import React from 'react'
import { Tabs } from 'expo-router'
import Entypo from '@expo/vector-icons/Entypo';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import TabBar from '@/components/tabBar';
import { SessionProvider } from '../../session'

const TabLayout = () => {
  return (
      <Tabs screenOptions={{headerShown: false}} tabBar={props => <TabBar {...props}/>}>
          <Tabs.Screen name='home' options={{title: "Home" }}/>
          <Tabs.Screen name='chat' options={{title: "Chat"}}/>
          <Tabs.Screen name='profile' options={{title: "Profile"}}/>
      </Tabs>
  )
}

export default TabLayout 