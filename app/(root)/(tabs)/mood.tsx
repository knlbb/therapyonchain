import React, { useEffect, useState } from 'react';
import AppleHealthKit from 'react-native-health';
import { Text, TouchableOpacity, View, Image, ScrollView } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { router } from "expo-router";
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';

interface HealthVariables {
    heartRate: number[],
    sleepDuration: number[],
    mindfulnessSessions: number,
    caloriesBurned: number[]
}

const Mood = () => {
    const [moodData, setMoodData] = useState<HealthVariables>({
        heartRate: [],
        sleepDuration: [],
        mindfulnessSessions: 0,
        caloriesBurned: []
    });

    const healthPermissions = {
        permissions: {
            read: [
                AppleHealthKit.Constants.Permissions.HeartRate,
                AppleHealthKit.Constants.Permissions.SleepAnalysis,
                AppleHealthKit.Constants.Permissions.MindfulSession,
                AppleHealthKit.Constants.Permissions.ActiveEnergyBurned,
            ],
            write: [] // Add write permissions if needed
        },
    };

    // Initialize HealthKit and request permissions
    useEffect(() => {
        setMoodData(fetchDummyData());
        // Uncomment to enable actual data fetching
        // AppleHealthKit.initHealthKit(healthPermissions, (err) => {
        //     if (err) {
        //         console.error("Error initializing HealthKit: ", err);
        //         return;
        //     }
        //     fetchHealthData();
        // });
    }, []);

    const fetchDummyData = (): HealthVariables => ({
        heartRate: [51, 63, 58, 55],
        sleepDuration: [6, 7, 7.5, 5.5],
        mindfulnessSessions: 4,
        caloriesBurned: [1800, 1650, 1700, 1933]
    });

    const calculateScore = (data: HealthVariables): number => 83;

    // Fetch health data function here (if needed)

    return (
        <SafeAreaView className="bg-white flex-1">
            <View className='h-20 flex flex-row px-5'>
                <View className="w-1/6 h-full items-center flex justify-center">
                    <Image className="h-12 w-12 rounded-full border border-white mr-3" source={require('../../assets/man.webp')} />
                </View>
                <View className='w-4/6 h-full flex justify-center'>
                    <Text className="text-xl font-semibold">Hi there, Chris!</Text>
                </View>
            </View>

            <View className="flex-1 p-5">
                <View className="flex flex-row h-24">
                    <View className="w-2/3">
                        <Text className="font-bold text-lg">Today</Text>
                        <Text className="text-md text-gray-400">Your wellbeing score is:</Text>
                    </View>
                    <View className="w-1/3 items-center justify-center">
                        <Text className="text-6xl font-extralight">{calculateScore(moodData)}</Text>
                    </View>
                </View>
                {/* Mood Icons Section
            <View className="flex justify-center flex-row">
                {["sick-outline", "angry-outline", "sad-outline", "happy-outline", "excited-outline"].map((icon, index) => (
                    <View key={index} className="w-[13%] aspect-square m-2 rounded-xl justify-center items-center bg-gray-100">
                        <MaterialCommunityIcons name={`emoticon-${icon}`} size={24} color="black" />
                    </View>
                ))}
                <View className="w-[13%] aspect-square m-2 rounded-xl justify-center items-center border bg-black">
                    <MaterialCommunityIcons name="emoticon-excited-outline" size={24} color="white" />
                </View>
            </View> */}

                {/* Health History Section */}
                <View className="mt-5">
                    <Text className="font-bold text-lg">Health History</Text>
                    <ScrollView className="mt-2" showsVerticalScrollIndicator={false}>
                        <View className="bg-gray-100 rounded-lg p-4 mb-4 shadow">
                            <Text className="font-semibold">Heart Rate:</Text>
                            {moodData.heartRate.length > 0 ? (
                                moodData.heartRate.map((rate, index) => (
                                    <Text key={index} className="text-gray-600">Rate: {rate} bpm</Text>
                                ))
                            ) : (
                                <Text className="text-gray-400">No data available</Text>
                            )}
                        </View>

                        <View className="bg-gray-100 rounded-lg p-4 mb-4 shadow">
                            <Text className="font-semibold">Sleep Duration:</Text>
                            {moodData.sleepDuration.length > 0 ? (
                                moodData.sleepDuration.map((duration, index) => (
                                    <Text key={index} className="text-gray-600">Duration: {duration} hours</Text>
                                ))
                            ) : (
                                <Text className="text-gray-400">No data available</Text>
                            )}
                        </View>

                        <View className="bg-gray-100 rounded-lg p-4 mb-4 shadow">
                            <Text className="font-semibold">Mindfulness Sessions:</Text>
                            <Text className="text-gray-600">{moodData.mindfulnessSessions} sessions</Text>
                        </View>

                        <View className="bg-gray-100 rounded-lg p-4 mb-4 shadow">
                            <Text className="font-semibold">Calories Burned:</Text>
                            {moodData.caloriesBurned.length > 0 ? (
                                moodData.caloriesBurned.map((calories, index) => (
                                    <Text key={index} className="text-gray-600">Calories: {calories}</Text>
                                ))
                            ) : (
                                <Text className="text-gray-400">No data available</Text>
                            )}
                        </View>
                    </ScrollView>
                </View>

            </View>

        </SafeAreaView>
    );
};

export default Mood;
