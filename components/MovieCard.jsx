import React from "react";
import { View, Text, Image } from "react-native";

const MovieCard = ({ movie }) => {
    return (
        <View className='items-center pt-4'>
            {movie.poster_path && (
                <Image
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
                    <View>
                        {movie.providers.US.flatrate &&
                            movie.providers.US.flatrate.map(
                                (provider, index) => (
                                    <Text
                                        key={index}
                                        className='text-purple-800'
                                    >
                                        {provider.provider_name}
                                    </Text>
                                )
                            )}
                    </View>
                )}
            </View>
        </View>
    );
};

export default MovieCard;
