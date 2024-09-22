import { Text, TouchableOpacity, View } from 'react-native'
import React, { Component } from 'react'
import { router } from 'expo-router'

const Header = ({title}: any) => {
 
    return (
      <View className='h-12 flex flex-row'>
        <View className='w-1/3 h-full items-center flex justify-center'>
          <TouchableOpacity  onPress={() => {
            router.push('/(root)/home')
          }}>
            <Text>BACK</Text>
          </TouchableOpacity>
        </View>
        <View className='w-1/3 h-full items-center flex justify-center'>
            <Text >{title}</Text>
        </View>
        <View className='w-1/3 h-full items-center flex justify-center'>
        </View>
      </View>
    )
  
}

export default Header