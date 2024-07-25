import React from "react";
import { View, Text, Image, Animated } from "react-native";
import MovieProvider from "./MovieProvider";
import { useEffect, useRef } from "react";

export function MovieCard({ movie }) {
    return (
        <View key={movie.title} className='items-center pt-4'>
            {movie.poster_path && (
                <Image
                    alt={movie.title}
                    source={{
                        uri: `https://image.tmdb.org/t/p/w500${movie.poster_path}`,
                    }}
                    style={{ width: 225, height: 360 }}
                />
            )}
            <View className='items-center p-4'>
                <Text className='text-2xl font-extrabold'>{movie.title}</Text>
                <Text className='text-base pt-2'>{movie.overview}</Text>
                {movie.providers && movie.providers.US && (
                    <MovieProvider movie={movie} />
                )}
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
            delay: index * 500,
            useNativeDriver: true,
        }).start();
    }, [opacity, index]);

    return (
        <Animated.View style={{ opacity }}>
            <MovieCard movie={movie} />
        </Animated.View>
    );
}
