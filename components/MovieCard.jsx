import { Link, useFocusEffect } from 'expo-router';
import React, { useCallback, useRef, useState } from 'react';
import { Animated, ImageBackground, Pressable, Text, View } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import MovieProvider from './MovieProvider';
import { useWatchList } from './WatchListContext';

export function MovieCard({ movie }) {
    const [isTextVisible, setIsTextVisible] = useState(false);
    const { isMovieInWatchList, toggleWatchList } = useWatchList();
    const [addWatchListButton, setAddWatchListButton] = useState(
        isMovieInWatchList(movie)
    );

    const switchTextVisibility = () => setIsTextVisible(!isTextVisible);

    useFocusEffect(
        useCallback(() => {
            setAddWatchListButton(isMovieInWatchList(movie));
    }, [isMovieInWatchList, movie]))

    return (
        <View key={movie.title} className='items-center p-2 m-6 bg-zinc-950'>
            <Pressable
                onPressIn={switchTextVisibility}
                onPressOut={switchTextVisibility}
            >
                {
                    <ImageBackground
                        alt={movie.title}
                        source={{
                            uri: `https://image.tmdb.org/t/p/w500${movie.poster_path}`,
                        }}
                        style={{
                            width: 300,
                            height: 450,
                            backgroundColor: 'grey',
                        }}
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
                                <Text className='text-4xl py-6 font-extrabold text-white'>
                                    {movie.title}
                                </Text>
                                <Text
                                    overflow='hidden'
                                    className='pr-6 text-lg font-normal text-white'
                                >
                                    {movie.overview && movie.overview.slice(0, 250)}
                                </Text>
                                <View className='pt-4 flex-row justify-center'>
                                    {movie.providers && movie.providers.US && (
                                        <MovieProvider movie={movie} />
                                    )}
                                </View>
                            </View>
                        )}
                    </ImageBackground>
                }
            </Pressable>
            <View className='flex-row justify-center'>
                <View className='m-4'>
                    <Pressable
                        className={`rounded-md p-2 ${
                            addWatchListButton ? 'bg-red-900' : 'bg-white'
                        }`}
                        onPress={() =>
                            toggleWatchList(movie) &&
                            setAddWatchListButton(!addWatchListButton)
                        }
                    >
                        <Text className='text-base'>
                            {addWatchListButton ? (
                                <Text className='text-white'>
                                    Remove from watch list
                                </Text>
                            ) : (
                                <>
                                    <Text>
                                        Add to watch list{' '}
                                        <Icon
                                            name='heart'
                                            size={18}
                                            color='#5b21b6'
                                            backgroundColor='transparent'
                                        />
                                    </Text>
                                </>
                            )}
                        </Text>
                    </Pressable>
                </View>
                <View className='m-4'>
                    {movie.id && (
                        <Link asChild href={`/${movie.id}`}>
                            <Pressable className='rounded-md bg-violet-800 p-2'>
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

    useFocusEffect(() => {
        Animated.timing(opacity, {
            toValue: 1,
            duration: 1000,
            delay: index * 300,
            useNativeDriver: true,
        }).start();
    });

    return (
        <Animated.View style={{ opacity }}>
            <MovieCard movie={movie} />
        </Animated.View>
    );
}
