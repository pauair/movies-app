import React from 'react';
import { View } from 'react-native';
import { Stack } from 'expo-router';

export default function Layout() {
    return (
        <View className='bg-black h-full'>
            <Stack
                screenOptions={{
                    headerStyle: {
                        backgroundColor: '#000',
                    },
                    headerTintColor: '#fff',
                    headerTitleStyle: {
                        fontWeight: 'bold',
                        fontSize: 36,
                    },
                    headerTitle: 'MoviesApp',
                    headerTitleAlign: 'center',

                }}
            />
        </View>
    );
}