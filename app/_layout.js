import { Stack } from 'expo-router';
import React from 'react';
import { Text, View } from 'react-native';
import FilmTrackerButton from '../components/FilmTrackerButton';
import WatchListButton from '../components/WatchListButton';
import { WatchListProvider } from '../components/WatchListContext';

export default function Layout() {
    return (
        <WatchListProvider>
                <Stack
                    screenOptions={{
                        headerStyle: {
                            backgroundColor: '#000',
                        },
                        headerTintColor: '#fff',
                        headerTitleStyle: {
                            fontWeight: 'bold',
                            fontSize: 30,
                        },
                        headerTitle: () => (
                            <View className='flex-row text-center items-center'>
                                <FilmTrackerButton />
                                <Text className='text-white text-2xl'>
                                    FilmTracker
                                </Text>
                            </View>
                        ),
                        headerRight: () => (
                            <View style={{ marginRight: 10 }}>
                                <WatchListButton />
                            </View>
                        ),
                        headerLeft: () => null,
                        headerTitleAlign: 'left',
                    }}
                />
        </WatchListProvider>
    );
}
