import React from 'react';
import { View } from 'react-native';
import { Stack, useRouter } from 'expo-router';
import Icon from 'react-native-vector-icons/FontAwesome6';
import { WatchListProvider } from '../components/WatchListContext';

export default function Layout() {

    const router = useRouter();

    const WatchListButton = () => (
        <Icon.Button
            name='heart-circle-check'
            size={30}
            color='red'
            backgroundColor='white'
            borderRadius={15}
            onPress={() => router.push('/watchList')}
            style={{ marginRight: 0, borderColor: '#c7246a', border: 3 }}
            iconStyle={{ marginRight: 0 }}
        />
    );

    return (
        <WatchListProvider>
        <View className='bg-black h-full pt-4'>
            <Stack
                screenOptions={{
                    headerStyle: {
                        backgroundColor: '#000',
                    },
                    headerTintColor: '#fff',
                    headerTitleStyle: {
                        fontWeight: 'bold',
                        fontSize: 34,
                    },
                    headerTitle: '  MoviesApp',
                    headerRight: () => (
                        <View style={{ margin: 10 }}>
                            <WatchListButton />
                        </View>
                    ),
                    headerTitleAlign: 'left',
                }}
            />
        </View>
        </WatchListProvider>
    );
}
