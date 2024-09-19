import React from 'react';
import { Stack } from 'expo-router';
import { Text, View } from 'react-native';

const WatchList = () => {
    return (
        <View className='min-h-full min-w-full px-4 py-4 bg-black'>
            <Stack.Screen
                options={{
                    headerTitle: '',
                    headerStyle: {
                        backgroundColor: 'transparent',
                    },
                    headerTransparent: true,
                    headerRight: () => null,
                }}
            />

            <Text className='text-white font-thin text-center text-xl py-6'>
                Your list is empty. Add some movies to your watch list!
            </Text>
        </View>
    );
};

export default WatchList;
