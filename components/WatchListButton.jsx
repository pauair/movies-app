import IconWatchList from 'react-native-vector-icons/MaterialCommunityIcons';
import { useRouter } from 'expo-router';
import React from 'react';

export default function WatchListButton() {
    const router = useRouter();
    
    return (
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
}