import { Stack } from 'expo-router';
import React, { useEffect, useState } from 'react';
import { Text, View } from 'react-native';
import FilmTrackerButton from '../components/common/FilmTrackerButton';
import WatchListButton from '../components/watchList/WatchListButton';
import { WatchListProvider } from '../components/watchList/WatchListContext';
import { AuthProvider, useAuth } from '../components/auth/AuthContext';
import Loading from '../components/common/Loading';

export default function Layout() {
    return (
        <AuthProvider>
            <WatchListProvider>
                <LayoutContent />
            </WatchListProvider>
        </AuthProvider>
    );
}

function LayoutContent() {
    const { session } = useAuth();
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (session !== undefined) {
            setLoading(false);
        }
    }, [session]);

    if (loading) {
        return <Loading />;
    }

    return (
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
                headerRight: () =>
                    session ? (
                        <View style={{ marginRight: 10 }}>
                            <WatchListButton />
                        </View>
                    ) : null,
                headerLeft: () => null,
                headerTitleAlign: 'left',
            }}
        />
    );
}
