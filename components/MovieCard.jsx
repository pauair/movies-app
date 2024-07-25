import React from "react";
import { View, Text, Image } from "react-native";
import MovieProvider from "./MovieProvider";

const MovieCard = ({ movie }) => {
    return (
        <View className='items-center pt-4'>
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
};

export default MovieCard;
