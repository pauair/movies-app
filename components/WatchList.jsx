import React from 'react';
import { Link, Stack } from 'expo-router';
import { useWatchList } from './WatchListContext';
import {
    Text,
    View,
    ImageBackground,
    ScrollView,
    Pressable,
} from 'react-native';
import IconMeh from 'react-native-vector-icons/AntDesign';

const WatchList = (watchList) => {

    const [isHeaderVisible, setHeaderVisible] = React.useState(true);
    const { getWatchList, clearWatchList, getWatchListCount, removeFromList } = useWatchList();

    watchList = getWatchList();
    const isWatchListEmpty = getWatchListCount() === 0;

    const handleScroll = (event) => {
        const scrollOffsetY = event.nativeEvent.contentOffset.y;
        setHeaderVisible(scrollOffsetY <= 10);
    };

    return (
        <ScrollView onScroll={handleScroll} className='min-h-full min-w-full px-2 py-2 bg-black align-middle'>
            <Stack.Screen
                options={{
                    headerTitle: () => 
                        <Text className='text-white font-thin text-xl'>MY WATCHLIST</Text>,
                    headerTitleAlign: 'center',
                    headerStyle: {
                        backgroundColor: 'transparent',
                    },
                    headerTransparent: true,
                    headerRight: () => null,
                    headerShown: isHeaderVisible,
                }}
            />
            {!isWatchListEmpty && (
                <View className='flex justify-center px-4 pt-12'>
                    <Text className='text-white font-medium text-center text-xl pt-6'>
                        You have <Text className='font-bold text-violet-400'>{watchList.length}{' '}</Text>
                        {watchList.length === 1 ? 'item' : 'items'} in your
                        watchlist.
                    </Text>
                    <Text className='text-white font-light text-center text-base pt-2'>
                        Press the image to view details or hold to remove the item.
                    </Text>
                </View>
            )}

            {watchList.length === 0 ? (
                <View className='py-36 px-8 text-center justify-center'>
                    <IconMeh
                        name='meho'
                        size={50}
                        color='#a78bfa'
                        style={{ textAlign: 'center', padding: 20 }}
                    />
                    <Text className='text-white font-light text-center text-2xl'>
                        Your watchlist is empty.
                    </Text>
                    <Text className='text-white font-thin text-center text-xl py-2'>
                        Add some movies or shows to start watching.
                    </Text>
                    <Link asChild href='../'>
                        <Text className='text-violet-400 font-bold text-center text-xl py-24'>
                            Go back to search page
                        </Text>
                    </Link>
                </View>
            ) : (
                <View className='flex-row flex-wrap justify-around py-16 px-4 '>
                    {watchList.map((movie, index) => (
                        <View key={index} className='py-1'>
                            <Link asChild href={`./${movie.id}`}>
                                <Pressable onLongPress={()=>removeFromList(movie)}>
                                    <ImageBackground
                                        alt={movie.title}
                                        source={{
                                            uri: `https://image.tmdb.org/t/p/w500${movie.poster_path}`,
                                        }}
                                        style={{
                                            width: 330 / 3,
                                            height: 480 / 3,
                                        }}
                                    ></ImageBackground>
                                </Pressable>
                            </Link>
                        </View>
                    ))}
                </View>
            )}
            {!isWatchListEmpty && (
                <View className='flex justify-center'>
                    <Pressable onPress={() => clearWatchList()}>
                        <Text className='text-red-900 font-medium text-center underline text-lg py-6'>
                            Remove all from your watch list
                        </Text>
                    </Pressable>
                </View>
            )}
        </ScrollView>
    );
};

export default WatchList;
