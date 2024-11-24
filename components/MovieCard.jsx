import React, { useEffect, useState, useRef } from 'react';
import { Animated, ImageBackground, Pressable, Text, View } from 'react-native';
import MovieProvider from './MovieProvider';
import { Link } from 'expo-router';
import { useWatchList } from './WatchListContext';

export function MovieCard({ movie }) {
    const [isTextVisible, setIsTextVisible] = useState(false);
    const { isMovieInWatchList, toggleWatchList } = useWatchList();
    const [addWatchListButton, setAddWatchListButton] = useState(isMovieInWatchList(movie));

    const switchTextVisibility = () => setIsTextVisible(!isTextVisible);

    useEffect(() => {
        setAddWatchListButton(isMovieInWatchList(movie));
    }, [isMovieInWatchList, movie]);

    return (
        <View key={movie.title} className='items-center p-2 m-6 bg-zinc-950'>
            <Pressable
                onPressIn={switchTextVisibility}
                onPressOut={switchTextVisibility}
            >
                {(
                    <ImageBackground
                        alt={movie.title}
                        source={{
                            uri: `https://image.tmdb.org/t/p/w500${movie.poster_path}`,
                        }}
                        style={{ width: 330, height: 480, backgroundColor: 'grey'}}
                    >
                        {isTextVisible && (
                            <View
                                style={{
                                    width: 330,
                                    height: 480,
                                    textAlign: 'center',
                                }}
                                className='p-6 opacity-80 bg-black flex-col'
                            >
                                <Text className='text-4xl py-6 font-black text-white'>
                                    {movie.title}
                                </Text>
                                <Text
                                    overflow='hidden'
                                    className='text-xl font-bold text-white'
                                >
                                    {movie.overview.slice(0, 250)}...
                                </Text>
                                <View className='pt-4 flex-row justify-center'>
                                    {movie.providers && movie.providers.US && (
                                        <MovieProvider movie={movie} />
                                    )}
                                </View>
                            </View>
                        )}
                    </ImageBackground>
                )}
            </Pressable>
            <View className='flex-row justify-center'>
                <View className='m-4'>
                <Pressable
                    className={`rounded-md p-2 ${
                        addWatchListButton ? 'bg-red-900' : 'bg-white'
                    }`}
                    onPress={() => toggleWatchList(movie) && setAddWatchListButton(!addWatchListButton)}
                >
                    <Text className="text-base">
                        { addWatchListButton ? <Text className='text-white'>Remove from watch list</Text> : 'Add to watch list ♥'}
                    </Text>
                </Pressable>
                </View>
                <View className='m-4'>
                    {movie.id && (
                        <Link asChild href={`/${movie.id}`}>
                            <Pressable className='rounded-md bg-green-800 p-2'>
                                <Text className='text-base text-white'>
                                    View More
                                </Text>
                            </Pressable>
                        </Link>
                    )}
                </View>
            </View>
        </View>
    );
}

export function AnimatedMovieCard({ movie, index }) {
    const opacity = useRef(new Animated.Value(0)).current;

    useEffect(() => {
        Animated.timing(opacity, {
            toValue: 1,
            duration: 1000,
            delay: index * 300,
            useNativeDriver: true,
        }).start();
    }, [opacity, index]);

    return (
        <Animated.View style={{ opacity }}>
            <MovieCard movie={movie} />
        </Animated.View>
    );
}
