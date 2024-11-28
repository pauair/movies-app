import { Stack, useRouter } from 'expo-router';
import React from 'react';
import { Text, View } from 'react-native';
import IconFilm from 'react-native-vector-icons/Fontisto';
import IconWatchList from 'react-native-vector-icons/MaterialCommunityIcons';
import { WatchListProvider } from '../components/WatchListContext';

export default function Layout() {
    const router = useRouter();

    const WatchListButton = () => (
        <IconWatchList.Button
            name='playlist-edit'
            size={30}
            color='white'
            backgroundColor='#5b21b6'
            borderRadius={100}
            onPress={() => router.push('/watchList')}
            style={{ marginRight: 0, borderColor: '#c7246a', border: 3 }}
            iconStyle={{ marginRight: 0 }}
        />
    );

    const FilmTrackerButton = () => (
        <IconFilm.Button
            name='film'
            size={32}
            color='white'
            backgroundColor='transparent'
            borderRadius={100}
            onPress={() => router.replace('/')}
            style={{ marginRight: 0, borderColor: '#c7246a', border: 3 }}
            iconStyle={{ marginRight: 0 }}
        />
    );

    return (
        <WatchListProvider>
            <View className='bg-black h-full pt-2'>
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
                                <Text className='text-white text-2xl'>FilmTracker</Text>
                            </View>
                        ),
                        headerRight: () => (
                            <View style={{ margin: 10 }}>
                                <WatchListButton />
                            </View>
                        ),
                        headerLeft: () => null,
                        headerTitleAlign: 'left',
                    }}
                />
            </View>
        </WatchListProvider>
    );
}
